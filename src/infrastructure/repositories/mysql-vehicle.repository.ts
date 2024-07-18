import { CommentEntity } from "../../domain/entities/comment.entity";
import { VehicleEntity } from "../../domain/entities/vehicle.entity";
import { VehicleInterface } from "../../domain/interfaces/vehicle.interface";
import VehicleModel from "../../database/mysql/models/vehicle.model";
import CommentModel from "../../database/mysql/models/comment.model";

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
                avalible: vehicle.avalible,
                address: vehicle.address,
                description: vehicle.description
            });

            return createdVehicle.uuid;
        } catch (error) {
            return null;
        }
    }

    public async getVehicleByUuid(uuid: number): Promise<VehicleEntity | null> {
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
                vehicle.avalible,
                vehicle.address,
                vehicle.description,
                vehicle.uuid
            );
        } catch (error) {
            return null;
        }
    }

    public async getVehicles(): Promise<VehicleEntity[]> {
        try {
            const vehicles = await VehicleModel.findAll();

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

    public async updateVehicle(vehicle: VehicleEntity): Promise<string | null> {
        try {
            await VehicleModel.update({
                type: vehicle.type,
                userId: vehicle.userId,
                stars: vehicle.stars,
                brand: vehicle.brand,
                model: vehicle.model,
                year: vehicle.year,
                color: vehicle.color,
                plate: vehicle.plate,
                avalible: vehicle.avalible,
                address: vehicle.address,
                description: vehicle.description
            }, {
                where: {
                    uuid: vehicle.uuid,
                },
            });

            return vehicle.uuid;
        } catch (error) {
            return null;
        }
    }

    public async deleteVehicle(id: number): Promise<boolean> {
        try {
            await VehicleModel.destroy({
                where: {
                    id,
                },
            });

            return true;
        } catch (error) {
            return false;
        }
    }
    public async getVehicleByUserUuid(uuid: number): Promise<VehicleEntity[]> {
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
    public async addCommentToVehicle(vehicleUuid: number, comment: CommentEntity): Promise<string | null> {
        try {
            const createdComment = await CommentModel.create({
                userId: comment.userId,
                vehicleId: comment.vehicleId,
                comment: comment.text,
                uuid: comment.uuid,
            });

            return createdComment.uuid;
        } catch (error) {
            return null;
        }
    }
    public async getCommentsFromVehicle(vehicleUuid: number): Promise<CommentEntity[]> {
        try {
            const comments = await CommentModel.findAll({
                where: {
                    vehicleId: vehicleUuid,
                },
            });

            return comments.map((comment) => {
                return new CommentEntity(
                    comment.id,
                    comment.userId,
                    comment.vehicleId,
                    comment.text,
                    comment.uuid
                );
            });
        } catch (error) {
            return [];
        }
    }
}
