import express from "express";
import { vehicleController } from "../vehicles.dependencies";

export const vehicleRouter = express.Router();

vehicleRouter.post ("/", vehicleController.createVehicle.bind(vehicleController));
vehicleRouter.get ("/:uuid", vehicleController.getVehicleByUuid.bind(vehicleController));
vehicleRouter.get ("/", vehicleController.getVehicles.bind(vehicleController));
vehicleRouter.put ("/", vehicleController.updateVehicle.bind(vehicleController));
vehicleRouter.delete ("/:uuid", vehicleController.deleteVehicle.bind(vehicleController));
vehicleRouter.get ("/user/:uuid", vehicleController.getVehicleByUserUuid.bind(vehicleController));
vehicleRouter.post ("/:uuid/comment", vehicleController.addCommentToVehicle.bind(vehicleController));
