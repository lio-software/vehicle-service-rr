import { CommentEntity } from "../../domain/entities/comment.entity";
import { VehicleEntity } from "../../domain/entities/vehicle.entity";
import { VehicleInterface } from "../../domain/interfaces/vehicle.interface";
import signale from "signale";

export class VehicleUseCases {
    constructor(readonly vehicleRepository: VehicleInterface) {}

    async createVehicle(vehicle: VehicleEntity): Promise<string | null> {
        const createdVehicle = await this.vehicleRepository.createVehicle(vehicle);

        if (!createdVehicle) {
            signale.error("Error creating vehicle");
            return null;
        }

        return createdVehicle;
    }

    async getVehicleByUuid(uuid: number): Promise<VehicleEntity | null> {
        const vehicle = await this.vehicleRepository.getVehicleByUuid(uuid);

        if (!vehicle) {
            signale.error("Vehicle not found");
            return null;
        }

        return vehicle;
    }

    async getVehicles(): Promise<VehicleEntity[]> {
        const vehicles = await this.vehicleRepository.getVehicles();

        if (!vehicles) {
            signale.error("Vehicles not found");
            return [];
        }

        return vehicles;
    }

    async updateVehicle(vehicle: VehicleEntity): Promise<string | null> {
        const updatedVehicle = await this.vehicleRepository.updateVehicle(vehicle);

        if (!updatedVehicle) {
            signale.error("Error updating vehicle");
            return null;
        }

        return updatedVehicle;
    }

    async deleteVehicle(id: number): Promise<boolean> {
        const deletedVehicle = await this.vehicleRepository.deleteVehicle(id);

        if (!deletedVehicle) {
            signale.error("Error deleting vehicle");
            return false;
        }

        return true;
    }

    async getVehicleByUserUuid(uuid: number): Promise<VehicleEntity[]> {
        const vehicles = await this.vehicleRepository.getVehicleByUserUuid(uuid);

        if (!vehicles) {
            signale.error("Vehicles not found");
            return [];
        }

        return vehicles;
    }

    async addCommentToVehicle(vehicleUuid: number, comment: CommentEntity): Promise<string | null> {
        const addedComment = await this.vehicleRepository.addCommentToVehicle(vehicleUuid, comment);

        if (!addedComment) {
            signale.error("Error adding comment to vehicle");
            return null;
        }

        return addedComment;
    }

    async getCommentsFromVehicle(vehicleUuid: number): Promise<CommentEntity[]> {
        const comments = await this.vehicleRepository.getCommentsFromVehicle(vehicleUuid);

        if (!comments) {
            signale.error("Comments not found");
            return [];
        }

        return comments;
    }
}
