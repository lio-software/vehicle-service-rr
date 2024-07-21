import express from "express";
import { vehicleController } from "../vehicles.dependencies";
import { upload, uploadToCloudinary } from "../utils/cloudinay.utils";
import { Request, Response } from "express";
import { BaseResponse } from "@src/domain/entities/dtos/responses/base.response";

export const vehicleRouter = express.Router();

vehicleRouter.post("/", vehicleController.createVehicle.bind(vehicleController));
vehicleRouter.get("/:uuid", vehicleController.getVehicleByUuid.bind(vehicleController));
vehicleRouter.get("/", vehicleController.getVehicles.bind(vehicleController));
vehicleRouter.get("/get/avalible", vehicleController.getAvalibleVehicles.bind(vehicleController))
vehicleRouter.get("/search/:text", vehicleController.getVehiclesByText.bind(vehicleController));
vehicleRouter.put("/:uuid", vehicleController.updateVehicle.bind(vehicleController));
vehicleRouter.delete("/:uuid", vehicleController.deleteVehicle.bind(vehicleController));
vehicleRouter.get("/user/:uuid", vehicleController.getVehicleByUserUuid.bind(vehicleController));
vehicleRouter.post("/:uuid/comment", vehicleController.addCommentToVehicle.bind(vehicleController));
vehicleRouter.get("/:uuid/comment", vehicleController.getCommentsFromVehicle.bind(vehicleController));

vehicleRouter.post("/images/upload", upload.array("files"), uploadToCloudinary, async (req: Request, res: Response) => {
    try {
        const cloudinaryUrls = req.body.cloudinaryUrls;
        if (cloudinaryUrls.length === 0) {
            console.error('No Cloudinary URLs found.');
            return res.status(500).send('Internal Server Error');
        }
        const images = cloudinaryUrls;

        const response: BaseResponse = { data: images, message: 'Images uploaded successfully' };

        return res.status(201).json(response);

    } catch (error) {
        return res.status(500).json({ error });
    }
});
