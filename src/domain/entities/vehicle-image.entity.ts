export class VehicleImageEntity {
    public id: number;
    public vehicleId: number;
    public imageUrl: string;
    public uuid: string;

    constructor(
        id: number,
        vehicleId: number,
        imageUrl: string,
        uuid: string
    ) {
        this.id = id;
        this.vehicleId = vehicleId;
        this.imageUrl = imageUrl;
        this.uuid = uuid;
    }
}
