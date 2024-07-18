import { CommentEntity } from "../entities/comment.entity";
import { UpdateVehicleRequest } from "../entities/dtos/requests/update-vehicle.request";
import { GetVehicleResponse } from "../entities/dtos/responses/get-vehicle.response";
import { VehicleEntity } from "../entities/vehicle.entity";

export interface VehicleInterface {
    createVehicle(vehicle: VehicleEntity): Promise<string | null>;
    getVehicleByUuid(id: string): Promise<GetVehicleResponse | null>;
    getVehicles(): Promise<GetVehicleResponse[]>;
    getAvalibleVehicles(): Promise<GetVehicleResponse[]>;
    getVehicleByText(text: string): Promise<GetVehicleResponse[]>;
    updateVehicle(uuid: string, vehicle: UpdateVehicleRequest): Promise<string | null>;
    deleteVehicle(id: string): Promise<boolean>;
    getVehicleByUserUuid(uuid: string): Promise<VehicleEntity[]>;
    addCommentToVehicle(vehicleUuid: string, comment: CommentEntity): Promise<string | null>;
    getCommentsFromVehicle(vehicleUuid: string): Promise<CommentEntity[]>;

}
