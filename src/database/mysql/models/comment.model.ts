import { Column, DataType, Model, Table } from "sequelize-typescript";

export interface CommentAttributes {
    id: number;
    vehicleId: string;
    userId: string;
    stars: number;
    text: string;
    uuid: string;
}

@Table({
    tableName: "comments",
    modelName: "Comment",
    timestamps: false,
})

export default class CommentModel extends Model implements CommentAttributes {
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
    declare vehicleId: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    declare userId: string;

    @Column({
        allowNull: false,
        type: DataType.DOUBLE,
    })
    declare stars: number;

    @Column({
        allowNull: false,
        type: DataType.TEXT("long"),
    })
    declare text: string;

    @Column({
        allowNull: true,
        defaultValue: DataType.UUIDV4,
        type: DataType.STRING,
        unique: true,
    })
    declare uuid: string;
}
