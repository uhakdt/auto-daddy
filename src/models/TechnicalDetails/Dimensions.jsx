export class Dimensions {
  unladenWeight;
  rigidArtic;
  bodyShape;
  payloadVolume;
  payloadWeight;
  height;
  numberOfDoors;
  numberOfSeats;
  kerbWeight;
  grossTrainWeight;
  fuelTankCapacity;
  loadLength;
  dataVersionNumber;
  wheelBase;
  carLength;
  width;
  numberOfAxles;
  grossVehicleWeight;
  grossCombinedWeight;

  constructor(data) {
    this.unladenWeight = data.UnladenWeight;
    this.rigidArtic = data.RigidArtic;
    this.bodyShape = data.BodyShape;
    this.payloadVolume = data.PayloadVolume;
    this.payloadWeight = data.PayloadWeight;
    this.height = data.Height;
    this.numberOfDoors = data.NumberOfDoors;
    this.numberOfSeats = data.NumberOfSeats;
    this.kerbWeight = data.KerbWeight;
    this.grossTrainWeight = data.GrossTrainWeight;
    this.fuelTankCapacity = data.FuelTankCapacity;
    this.loadLength = data.LoadLength;
    this.dataVersionNumber = data.DataVersionNumber;
    this.wheelBase = data.WheelBase;
    this.carLength = data.CarLength;
    this.width = data.Width;
    this.numberOfAxles = data.NumberOfAxles;
    this.grossVehicleWeight = data.GrossVehicleWeight;
    this.grossCombinedWeight = data.GrossCombinedWeight;
  }
}
