import { CommentEntity } from "../entities/comment.entity";
import { VehicleEntity } from "../entities/vehicle.entity";

export interface VehicleInterface {
    createVehicle(vehicle: VehicleEntity): Promise<string | null>;
    getVehicleByUuid(id: number): Promise<VehicleEntity | null>;
    getVehicles(): Promise<VehicleEntity[]>;
    updateVehicle(vehicle: VehicleEntity): Promise<string | null>;
    deleteVehicle(id: number): Promise<boolean>;
    getVehicleByUserUuid(uuid: number): Promise<VehicleEntity[]>;
    addCommentToVehicle(vehicleUuid: number, comment: CommentEntity): Promise<string | null>;
    getCommentsFromVehicle(vehicleUuid: number): Promise<CommentEntity[]>;
}
