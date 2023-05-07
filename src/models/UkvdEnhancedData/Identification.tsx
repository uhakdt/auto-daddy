export class Identification {
  isElectricVehicle: boolean | null;

  constructor(data: any) {
    this.isElectricVehicle = data.IsElectricVehicle;
  }
}
