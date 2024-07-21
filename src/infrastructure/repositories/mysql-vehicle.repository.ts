import { CommentEntity } from "../../domain/entities/comment.entity";
import { VehicleEntity } from "../../domain/entities/vehicle.entity";
import { VehicleInterface } from "../../domain/interfaces/vehicle.interface";
import VehicleModel from "../../database/mysql/models/vehicle.model";
import CommentModel from "../../database/mysql/models/comment.model";
import { GetVehicleResponse } from "../../domain/entities/dtos/responses/get-vehicle.response";
import { UpdateVehicleRequest } from "../../domain/entities/dtos/requests/update-vehicle.request";
import { CreateVehicleRequest } from "../../domain/entities/dtos/requests/create-vehicle.request";
import VehicleImageModel from "../../database/mysql/models/vehicle-image.model";
import sendMessageAndWaitForResponse from "../services/rabbit/saga.messagin";
import { Op } from "sequelize";

export class MysqlVehicleRepository implements VehicleInterface {
    public async createVehicle(vehicle: CreateVehicleRequest): Promise<string | null> {
        console.log(vehicle);
        try {
            const createdVehicle = await VehicleModel.create({
                type: vehicle.type,
                userId: vehicle.userId,
                stars: 0,
                brand: vehicle.brand,
                model: vehicle.model,
                year: vehicle.year,
                color: vehicle.color,
                plate: vehicle.plate,
                rentalPrice: vehicle.rentalPrice,
                avalible: true,
                address: vehicle.address,
                description: vehicle.description
            });

            const createdImages = await VehicleImageModel.bulkCreate(vehicle.vehicleImages.map((image) => {
                return {
                    vehicleId: createdVehicle.id,
                    imageUrl: image,
                };
            }));

            return createdVehicle.uuid;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    public async getVehicleByUuid(uuid: string): Promise<GetVehicleResponse | null> {
        try {
            const vehicle = await VehicleModel.findOne({
                where: {
                    uuid,
                },
            });

            if (!vehicle) {
                return null;
            }

            const images = await VehicleImageModel.findAll({
                where: {
                    vehicleId: vehicle.id,
                },
            });

            const userId = vehicle.userId;

            const response = await sendMessageAndWaitForResponse("getUserFromCar", { userId });

            vehicle.userId = response.data;


            return new GetVehicleResponse(
                vehicle.type,
                vehicle.userId,
                vehicle.stars,
                vehicle.brand,
                vehicle.model,
                vehicle.year,
                vehicle.color,
                vehicle.plate,
                vehicle.rentalPrice,
                vehicle.avalible,
                vehicle.address,
                vehicle.description,
                images.map((image) => image.imageUrl),
                vehicle.uuid
            )
        } catch (error) {
            return null;
        }
    }

    public async getVehicles(): Promise<GetVehicleResponse[]> {
        try {
            const vehicles = await VehicleModel.findAll();

            const response = await Promise.all(vehicles.map(async (vehicle) => {
                const images = await VehicleImageModel.findAll({
                    where: {
                        vehicleId: vehicle.id,
                    },
                });

                return new GetVehicleResponse(
                    vehicle.type,
                    vehicle.userId,
                    vehicle.stars,
                    vehicle.brand,
                    vehicle.model,
                    vehicle.year,
                    vehicle.color,
                    vehicle.plate,
                    vehicle.rentalPrice,
                    vehicle.avalible,
                    vehicle.address,
                    vehicle.description,
                    images.map((image) => image.imageUrl),
                    vehicle.uuid
                );
            }));

            return response;
        } catch (error) {
            return [];
        }
    }

    public async getAvalibleVehicles(): Promise<GetVehicleResponse[]> {
        try {
            const vehicles = await VehicleModel.findAll({
                where: {
                    avalible: true
                }
            })

            const response = await Promise.all(vehicles.map(async (vehicle) => {
                const images = await VehicleImageModel.findAll({
                    where: {
                        vehicleId: vehicle.id,
                    },
                });

                return new GetVehicleResponse(
                    vehicle.type,
                    vehicle.userId,
                    vehicle.stars,
                    vehicle.brand,
                    vehicle.model,
                    vehicle.year,
                    vehicle.color,
                    vehicle.plate,
                    vehicle.rentalPrice,
                    vehicle.avalible,
                    vehicle.address,
                    vehicle.description,
                    images.map((image) => image.imageUrl),
                    vehicle.uuid
                );
            }));

            return response;
        } catch (error) {
            return [];
        }
    }

    public async getVehicleByText(text: string): Promise<GetVehicleResponse[]> {
        try {
            // Realizar la búsqueda en la base de datos utilizando un operador de búsqueda flexible
            // como 'LIKE' o una función de búsqueda de texto completo, dependiendo de la configuración de la base de datos.
            // Aquí se asume una búsqueda simple con 'LIKE' para múltiples campos.
            const vehicles = await VehicleModel.findAll({
                where: {
                    [Op.or]: [
                        { brand: { [Op.like]: `%${text}%` } },
                        { model: { [Op.like]: `%${text}%` } },
                        { description: { [Op.like]: `%${text}%` } },
                        // Agregar más campos según sea necesario
                    ]
                }
            });
    
            const response = await Promise.all(vehicles.map(async (vehicle) => {
                const images = await VehicleImageModel.findAll({
                    where: {
                        vehicleId: vehicle.id,
                    },
                });

                return new GetVehicleResponse(
                    vehicle.type,
                    vehicle.userId,
                    vehicle.stars,
                    vehicle.brand,
                    vehicle.model,
                    vehicle.year,
                    vehicle.color,
                    vehicle.plate,
                    vehicle.rentalPrice,
                    vehicle.avalible,
                    vehicle.address,
                    vehicle.description,
                    images.map((image) => image.imageUrl),
                    vehicle.uuid
                );
            }));
    
            return response;
        } catch (error) {
            console.error('Error fetching vehicles by text:', error);
            return [];
        }
    }



    public async updateVehicle(uuid: string, vehicle: UpdateVehicleRequest): Promise<string | null> {
        try {
            const foundVehicle = await this.findVehicleByUuid(uuid);

            if (!foundVehicle) {
                return null;
            }

            await VehicleModel.update({
                type: foundVehicle.type,
                userId: foundVehicle.userId,
                stars: foundVehicle.stars,
                brand: vehicle.brand,
                model: vehicle.model,
                year: vehicle.year,
                color: vehicle.color,
                plate: vehicle.plate,
                rentalPrice: vehicle.rentalPrice,
                avalible: vehicle.avalible,
                address: vehicle.address,
                description: vehicle.description,
            }, {
                where: {
                    id: foundVehicle.id,
                },
            });


            return uuid;
        } catch (error) {
            return null;
        }
    }

    public async deleteVehicle(id: string): Promise<boolean> {
        try {
            await VehicleModel.destroy({
                where: {
                    uuid: id,
                },
            });

            return true;
        } catch (error) {
            return false;
        }
    }
    public async getVehicleByUserUuid(uuid: string): Promise<GetVehicleResponse[]> {
        try {
            const vehicles = await VehicleModel.findAll({
                where: {
                    userId: uuid,
                },
            });

            const response = await Promise.all(vehicles.map(async (vehicle) => {
                const images = await VehicleImageModel.findAll({
                    where: {
                        vehicleId: vehicle.id,
                    },
                });

                return new GetVehicleResponse(
                    vehicle.type,
                    vehicle.userId,
                    vehicle.stars,
                    vehicle.brand,
                    vehicle.model,
                    vehicle.year,
                    vehicle.color,
                    vehicle.plate,
                    vehicle.rentalPrice,
                    vehicle.avalible,
                    vehicle.address,
                    vehicle.description,
                    images.map((image) => image.imageUrl),
                    vehicle.uuid
                );
            }));

            return response;
        } catch (error) {
            return [];
        }
    }
    public async addCommentToVehicle(vehicleUuid: string, comment: CommentEntity): Promise<string | null> {
        try {
            const foundVehicle = await this.findVehicleByUuid(vehicleUuid);

            console.log(foundVehicle);

            if (!foundVehicle) {
                return null;
            }

            const createdComment = await CommentModel.create({
                userId: comment.userId,
                vehicleId: foundVehicle.id,
                stars: comment.stars,
                text: comment.text,
            });

            return createdComment.uuid;
        } catch (error) {
            return null;
        }
    }
    public async getCommentsFromVehicle(vehicleUuid: string): Promise<CommentEntity[]> {
        try {
            const foundVehicle = await this.findVehicleByUuid(vehicleUuid);

            if (!foundVehicle) {
                return [];
            }

            const comments = await CommentModel.findAll({
                where: {
                    vehicleId: foundVehicle.id,
                },
            });

            for (const comment of comments) {
                const response = await sendMessageAndWaitForResponse("getUserFromCar", { userId: comment.userId });
                comment.userId = response.data;
            }

            return comments.map((comment) => {
                return new CommentEntity(
                    comment.id,
                    comment.userId,
                    comment.vehicleId,
                    comment.stars,
                    comment.text,
                    comment.uuid
                );
            });
        } catch (error) {
            return [];
        }
    }

    private async findVehicleByUuid(uuid: string): Promise<VehicleEntity | null> {
        try {
            const vehicle = await VehicleModel.findOne({
                where: {
                    uuid,
                },
            });

            if (!vehicle) {
                return null;
            }

            return new VehicleEntity(
                vehicle.id,
                vehicle.type,
                vehicle.userId,
                vehicle.stars,
                vehicle.brand,
                vehicle.model,
                vehicle.year,
                vehicle.color,
                vehicle.plate,
                vehicle.rentalPrice,
                vehicle.avalible,
                vehicle.address,
                vehicle.description,
                vehicle.uuid
            );
        } catch (error) {
            return null;
        }
    }
}
