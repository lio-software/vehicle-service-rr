export class CommentEntity {
    public id: number;
    public userId: number;
    public vehicleId: number;
    public stars: number;
    public text: string;
    public uuid: string;

    constructor(
        id: number,
        userId: number,
        vehicleId: number,
        stars: number,
        text: string,
        uuid: string
    ) {
        this.id = id;
        this.userId = userId;
        this.vehicleId = vehicleId;
        this.stars = stars;
        this.text = text;
        this.uuid = uuid;
    }
}
