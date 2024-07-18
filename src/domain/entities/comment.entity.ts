export class CommentEntity {
    public id: number;
    public userId: number;
    public vehicleId: number;
    public text: string;
    public uuid: string;

    constructor(
        id: number,
        userId: number,
        vehicleId: number,
        text: string,
        uuid: string
    ) {
        this.id = id;
        this.userId = userId;
        this.vehicleId = vehicleId;
        this.text = text;
        this.uuid = uuid;
    }
}
