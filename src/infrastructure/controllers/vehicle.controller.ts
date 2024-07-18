import { VehicleUseCases } from "../../application/use-case/vehicle-use-cases";
import { BaseResponse } from "../../domain/entities/dtos/responses/base.response";

export class VehicleController {
    constructor(readonly vehicleUseCases: VehicleUseCases) {}

    async createVehicle(req: any, res: any): Promise<void> {
        const vehicle = req.body;

        try {
            const vehicleUuid = await this.vehicleUseCases.createVehicle(vehicle);

            if (!vehicleUuid) {
                const response = new BaseResponse({}, "Error creating vehicle");

                return res.status(400).json(response);
            }

            const response = new BaseResponse({ vehicleUuid }, "Vehicle created successfully");

            return res.status(201).json(response);
        } catch (error) {
            const errors = (error as any).errors.map((err: any) => err.message);

			const response = new BaseResponse({}, errors);

			return res.status(500).json(response);
        }
    }

    async getVehicleByUuid(req: any, res: any): Promise<void> {
        const { uuid } = req.params;

        try {
            const vehicle = await this.vehicleUseCases.getVehicleByUuid(uuid);

            if (!vehicle) {
                const response = new BaseResponse({}, "Vehicle not found");

                return res.status(404).json(response);
            }

            const response = new BaseResponse(vehicle, "Vehicle found successfully");

            return res.status(200).json(response);
        } catch (error) {
            const errors = (error as any).errors.map((err: any) => err.message);

            const response = new BaseResponse({}, errors);

            return res.status(500).json(response);
        }
    }

    async getVehicles(req: any, res: any): Promise<void> {
        try {
            const vehicles = await this.vehicleUseCases.getVehicles();

            if (!vehicles) {
                const response = new BaseResponse({}, "Vehicles not found");

                return res.status(404).json(response);
            }

            const response = new BaseResponse(vehicles, "Vehicles found successfully");

            return res.status(200).json(response);
        } catch (error) {
            const errors = (error as any).errors.map((err: any) => err.message);

            const response = new BaseResponse({}, errors);

            return res.status(500).json(response);
        }
    }

    async getAvalibleVehicles(req: any, res: any): Promise<void> {
        try {
            const vehicles = await this.vehicleUseCases.getAvalibleVehicles();

            if (!vehicles) {
                const response = new BaseResponse({}, "Avalible vehicles not found");

                return res.status(404).json(response);
            }

            const response = new BaseResponse(vehicles, "Avalible vehicles found successfully");

            return res.status(200).json(response);
        } catch (error) {
            const errors = (error as any).errors.map((err: any) => err.message);

            const response = new BaseResponse({}, errors);

            return res.status(500).json(response);
        }
    }

    async getVehiclesByText(req: any, res: any): Promise<void> {
        const text = req.params;
        try {
            const vehicles = await this.vehicleUseCases.getVehiclesByText(text);

            if (!vehicles) {
                const response = new BaseResponse({}, "Vehicles not found");

                return res.status(404).json(response);
            }

            const response = new BaseResponse(vehicles, "Vehicles found successfully");

            return res.status(200).json(response);
        } catch (error) {
            const errors = (error as any).errors.map((err: any) => err.message);

            const response = new BaseResponse({}, errors);

            return res.status(500).json(response);
        }
    }

    async updateVehicle(req: any, res: any): Promise<void> {
        const vehicle = req.body;
        const { uuid } = req.params;

        try {
            const vehicleUuid = await this.vehicleUseCases.updateVehicle(uuid, vehicle);

            if (!vehicleUuid) {
                const response = new BaseResponse({}, "Error updating vehicle");

                return res.status(400).json(response);
            }

            const response = new BaseResponse({ vehicleUuid }, "Vehicle updated successfully");

            return res.status(200).json(response);
        } catch (error) {
            const errors = (error as any).errors.map((err: any) => err.message);

            const response = new BaseResponse({}, errors);

            return res.status(500).json(response);
        }
    }

    async deleteVehicle(req: any, res: any): Promise<void> {
        const { uuid } = req.params;

        try {
            const deleted = await this.vehicleUseCases.deleteVehicle(uuid);

            if (!deleted) {
                const response = new BaseResponse({}, "Error deleting vehicle");

                return res.status(400).json(response);
            }

            const response = new BaseResponse({}, "Vehicle deleted successfully");

            return res.status(200).json(response);
        } catch (error) {
            const errors = (error as any).errors.map((err: any) => err.message);

            const response = new BaseResponse({}, errors);

            return res.status(500).json(response);
        }
    }

    async getVehicleByUserUuid(req: any, res: any): Promise<void> {
        const { uuid } = req.params;

        try {
            const vehicles = await this.vehicleUseCases.getVehicleByUserUuid(uuid);

            if (!vehicles) {
                const response = new BaseResponse({}, "Vehicles not found");

                return res.status(404).json(response);
            }

            const response = new BaseResponse(vehicles, "Vehicles found successfully");

            return res.status(200).json(response);
        } catch (error) {
            const errors = (error as any).errors.map((err: any) => err.message);

            const response = new BaseResponse({}, errors);

            return res.status(500).json(response);
        }
    }

    async addCommentToVehicle(req: any, res: any): Promise<void> {
        const { uuid } = req.params;
        const comment = req.body;

        try {
            const vehicleUuid = await this.vehicleUseCases.addCommentToVehicle(uuid, comment);

            if (!vehicleUuid) {
                const response = new BaseResponse({}, "Error adding comment to vehicle");

                return res.status(400).json(response);
            }

            const response = new BaseResponse({ vehicleUuid }, "Comment added to vehicle successfully");

            return res.status(201).json(response);
        } catch (error) {
            const errors = (error as any).errors.map((err: any) => err.message);

            const response = new BaseResponse({}, errors);

            return res.status(500).json(response);
        }
    }

    async getCommentsFromVehicle(req: any, res: any): Promise<void> {
        const { uuid } = req.params;

        try {
            const comments = await this.vehicleUseCases.getCommentsFromVehicle(uuid);

            if (!comments) {
                const response = new BaseResponse({}, "Comments not found");

                return res.status(404).json(response);
            }

            const response = new BaseResponse(comments, "Comments found successfully");

            return res.status(200).json(response);
        } catch (error) {
            const errors = (error as any).errors.map((err: any) => err.message);

            const response = new BaseResponse({}, errors);

            return res.status(500).json(response);
        }
    }
}
