export class Engine {
  fuelCatalyst: string | null;
  stroke: number | null;
  primaryFuelFlag: string | null;
  valvesPerCylinder: number | null;
  aspiration: string | null;
  fuelSystem: string | null;
  numberOfCylinders: number | null;
  cylinderArrangement: string | null;
  valveGear: string | null;
  location: string | null;
  description: object | null;
  bore: number | null;
  make: string | null;
  fuelDelivery: string;

  constructor(data: any) {
    this.fuelCatalyst = data.FuelCatalyst;
    this.stroke = data.Stroke;
    this.primaryFuelFlag = data.PrimaryFuelFlag;
    this.valvesPerCylinder = data.ValvesPerCylinder;
    this.aspiration = data.Aspiration;
    this.fuelSystem = data.FuelSystem;
    this.numberOfCylinders = data.NumberOfCylinders;
    this.cylinderArrangement = data.CylinderArrangement;
    this.valveGear = data.ValveGear;
    this.location = data.Location;
    this.description = data.Description;
    this.bore = data.Bore;
    this.make = data.Make;
    this.fuelDelivery = data.FuelDelivery;
  }
}
