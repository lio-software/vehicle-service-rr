import express from "express";
import dotenv from "dotenv";
import { Signale } from "signale";
import morgan from "morgan";
import { } from "../tsconfig.json";
import cors from "cors";
import syncConnection from "./database/mysql/connection";
import { vehicleRouter } from "./infrastructure/routers/vehicle-router";

export const app = express();
const logger = new Signale();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

const PORT = process.env.PORT || 3003;
const API_PREFIX = process.env.API_PREFIX || "/api/v1";

app.options("*", cors())
app.use(cors())

app.use(`${API_PREFIX}/vehicles`, vehicleRouter);

async function startServer() {
    await syncConnection();
    app.listen(PORT, () => {
        logger.success(`Server running on http://localhost:${PORT}${API_PREFIX}`);
    });
}

startServer();
