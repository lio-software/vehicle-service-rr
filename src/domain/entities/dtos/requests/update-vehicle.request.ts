export class UpdateVehicleRequest {
    public brand: string;
    public model: string;
    public year: number;
    public color: string;
    public plate: string;
    public rentalPrice: number;
    public avalible: boolean;
    public address: string;
    public description: string;

    constructor(
        brand: string,
        model: string,
        year: number,
        color: string,
        plate: string,
        rentalPrice: number,
        avalible: boolean,
        address: string,
        description: string,
    ) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.color = color;
        this.plate = plate;
        this.rentalPrice = rentalPrice;
        this.avalible = avalible;
        this.address = address;
        this.description = description;
    }
}
