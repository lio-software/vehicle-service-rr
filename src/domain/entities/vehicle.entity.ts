export class VehicleEntity {
    public id: number;
    public type: string;
    public userId: number;
    public stars: number;
    public brand: string;
    public model: string;
    public year: number;
    public color: string;
    public plate: string;
    public avalible: boolean;
    public address: string;
    public description: string;
    public uuid: string;

    constructor(
        id: number,
        type: string,
        userId: number,
        stars: number,
        brand: string,
        model: string,
        year: number,
        color: string,
        plate: string,
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
        this.avalible = avalible;
        this.address = address;
        this.description = description;
        this.uuid = uuid;
    }
}
