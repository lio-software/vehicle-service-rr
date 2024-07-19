export class VehicleEntity {
    public id: number;
    public type: string;
    public userId: string;
    public stars: number;
    public brand: string;
    public model: string;
    public year: number;
    public color: string;
    public plate: string;
    public rentalPrice: number;
    public avalible: boolean;
    public address: string;
    public description: string;
    public uuid: string;

    constructor(
        id: number,
        type: string,
        userId: string,
        stars: number,
        brand: string,
        model: string,
        year: number,
        color: string,
        plate: string,
        rentalPrice: number,
        avalible: boolean,
        address: string,
        description: string,
        uuid: string
    ) {
        this.id = id;
        this.type = type;
        this.userId = userId;
        this.stars = stars;
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.color = color;
        this.plate = plate;
        this.rentalPrice = rentalPrice;
        this.avalible = avalible;
        this.address = address;
        this.description = description;
        this.uuid = uuid;
    }
}
