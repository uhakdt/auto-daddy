export class Dimensions {
  unladenWeight: number | null;
  rigidArtic: string | null;
  bodyShape: string | null;
  payloadVolume: object | null;
  payloadWeight: object | null;
  height: number | null;
  numberOfDoors: number | null;
  numberOfSeats: number | null;
  kerbWeight: number | null;
  grossTrainWeight: object | null;
  fuelTankCapacity: number | null;
  loadLength: object | null;
  dataVersionNumber: object | null;
  wheelBase: number | null;
  carLength: number | null;
  width: number | null;
  numberOfAxles: number | null;
  grossVehicleWeight: number | null;
  grossCombinedWeight: object | null;

  constructor(data: any) {
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
