export class Engine {
  stroke: number;
  primaryFuelFlag: string;
  valvesPerCylinder: number;
  aspiration: string;
  numberOfCylinders: number;
  cylinderArrangement: string;
  valveGear: string;
  location: string;
  description: string;
  bore: number;
  make: string;

  constructor(data: any) {
    this.stroke = data.Stroke;
    this.primaryFuelFlag = data.PrimaryFuelFlag;
    this.valvesPerCylinder = data.ValvesPerCylinder;
    this.aspiration = data.Aspiration;
    this.numberOfCylinders = data.NumberOfCylinders;
    this.cylinderArrangement = data.CylinderArrangement;
    this.valveGear = data.ValveGear;
    this.location = data.Location;
    this.description = data.Description;
    this.bore = data.Bore;
    this.make = data.Make;
  }
}
