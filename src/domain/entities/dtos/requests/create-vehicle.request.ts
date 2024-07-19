export class CreateVehicleRequest {
    public type: string;
    public userId: string;
    public brand: string;
    public model: string;
    public year: number;
    public color: string;
    public plate: string;
    public rentalPrice: number;
    public address: string;
    public description: string;
    public vehicleImages: string[];
    public uuid: string;

    constructor(
        type: string,
        userId: string,
        brand: string,
        model: string,
        year: number,
        color: string,
        plate: string,
        rentalPrice: number,
        address: string,
        description: string,
        vehicleImages: string[],
        uuid: string
    ) {
        this.type = type;
        this.userId = userId;
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.color = color;
        this.plate = plate;
        this.rentalPrice = rentalPrice;
        this.address = address;
        this.description = description;
        this.vehicleImages = vehicleImages;
        this.uuid = uuid;
    }
}
