export class Engine {
  fuelCatalyst;
  stroke;
  primaryFuelFlag;
  valvesPerCylinder;
  aspiration;
  fuelSystem;
  numberOfCylinders;
  cylinderArrangement;
  valveGear;
  location;
  description;
  bore;
  make;
  fuelDelivery;

  constructor(data) {
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
