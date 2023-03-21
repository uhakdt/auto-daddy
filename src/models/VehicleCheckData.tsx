export class VehicleCheckData {
  licensePlate: string;
  model: string;
  colour: string;
  year: number;

  constructor(data: any) {
    this.licensePlate = data.LicensePlate;
    this.model = data.Model;
    this.colour = data.Colour;
    this.year = data.Year;
  }
}
