export class VehicleCheckData {
  model: string;
  colour: string;
  year: number;

  constructor(data: any) {
    this.model = data.Model;
    this.colour = data.Colour;
    this.year = data.Year;
  }
}
