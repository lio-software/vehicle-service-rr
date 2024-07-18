import { Column, DataType, Model, Table } from "sequelize-typescript";

export interface VehicleAttributes {
    id: number;
    type: string;
    userId: number;
    stars: number;
    brand: string;
    model: string;
    year: number;
    color: string;
    plate: string;
    rentalPrice: number;
    avalible: boolean;
    address: string;
    description: string;
    uuid: string;
}

@Table({
    tableName: "vehicles",
    modelName: "Vehicle",
    timestamps: false,
})
export default class VehicleModel extends Model implements  VehicleAttributes {
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        autoIncrement: true,
        unique: true,
    })
    declare id: number;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    declare type: string;

    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    declare userId: number;

    @Column({
        allowNull: true,
        type: DataType.DOUBLE,
    })
    declare stars: number;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    declare brand: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    declare model: string;

    @Column({
        allowNull: true,
        type: DataType.INTEGER,
    })
    declare year: number;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    declare color: string;

    @Column({
        allowNull: true,
        type: DataType.STRING,
    })
    declare plate: string;

    @Column({
        allowNull: false,
        type: DataType.DOUBLE,
    })
    declare rentalPrice: number;

    @Column({
        allowNull: true,
        type: DataType.BOOLEAN,
    })
    declare avalible: boolean;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    declare address: string;

    @Column({
        allowNull: false,
        type: DataType.TEXT("long"),
    })
    declare description: string;

    @Column({
        allowNull: true,
        defaultValue: DataType.UUIDV4,
        type: DataType.STRING,
        unique: true,
    })
    declare uuid: string;
}
