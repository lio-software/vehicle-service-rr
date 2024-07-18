import { Column, DataType, Model, Table } from "sequelize-typescript";

export interface VehicleImageAttributes {
    id: number;
    vehicleId: number;
    imageUrl: string;
    uuid: string;
}

@Table({
    tableName: "vehicle_images",
    modelName: "VehicleImage",
    timestamps: false,
})

export default class VehicleImageModel extends Model implements VehicleImageAttributes {
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        autoIncrement: true,
        unique: true,
    })
    declare id: number;

    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    declare vehicleId: number;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    declare imageUrl: string;

    @Column({
        allowNull: true,
        defaultValue: DataType.UUIDV4,
        type: DataType.STRING,
        unique: true,
    })
    declare uuid: string;
}
