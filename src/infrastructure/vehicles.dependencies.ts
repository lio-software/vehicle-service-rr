import { VehicleUseCases } from "../application/use-case/vehicle-use-cases";
import { VehicleController } from "./controllers/vehicle.controller";
import { MysqlVehicleRepository } from "./repositories/mysql-vehicle.repository";

const mysqlVehicleRepository = new MysqlVehicleRepository();

const vehicleUseCases = new VehicleUseCases(mysqlVehicleRepository);

export const vehicleController = new VehicleController(vehicleUseCases);
