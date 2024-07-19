export class CommentEntity {
    public id: number;
    public userId: string;
    public vehicleId: string;
    public stars: number;
    public text: string;
    public uuid: string;

    constructor(
        id: number,
        userId: string,
        vehicleId: string,
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
