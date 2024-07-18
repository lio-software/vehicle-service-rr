import { CommentEntity } from "../../domain/entities/comment.entity";
import { VehicleEntity } from "../../domain/entities/vehicle.entity";
import { VehicleInterface } from "../../domain/interfaces/vehicle.interface";
import VehicleModel from "../../database/mysql/models/vehicle.model";
import CommentModel from "../../database/mysql/models/comment.model";
import { GetVehicleResponse } from "../../domain/entities/dtos/responses/get-vehicle.response";
import { UpdateVehicleRequest } from "@src/domain/entities/dtos/requests/update-vehicle.request";

export class MysqlVehicleRepository implements VehicleInterface {
    public async createVehicle(vehicle: VehicleEntity): Promise<string | null> {
        try {
            const createdVehicle = await VehicleModel.create({
                type: vehicle.type,
                userId: vehicle.userId,
                stars: vehicle.stars,
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

            return createdVehicle.uuid;
        } catch (error) {
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
                vehicle.uuid
            )
        } catch (error) {
            return null;
        }
    }

    public async getVehicles(): Promise<GetVehicleResponse[]> {
        try {
            const vehicles = await VehicleModel.findAll();

            return vehicles.map((vehicle) => {
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
                    vehicle.uuid
                );
            });
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

            return vehicles.map((vehicle) => {
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
                    vehicle.uuid
                );
            });
        } catch (error) {
            return [];
        }
    }

    public async getVehicleByText(text: string): Promise<GetVehicleResponse[]> {
        try {
            const vehicles = await VehicleModel.findAll();

            return vehicles.map((vehicle) => {
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
                    vehicle.uuid
                );
            });
        } catch (error) {
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
    public async getVehicleByUserUuid(uuid: string): Promise<VehicleEntity[]> {
        try {
            const vehicles = await VehicleModel.findAll({
                where: {
                    userId: uuid,
                },
            });

            return vehicles.map((vehicle) => {
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
            });
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
