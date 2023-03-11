export class Dimensions {
  unladenWeight: number | null;
  rigidArtic: string;
  bodyShape: string;
  payloadVolume: number | null;
  payloadWeight: number | null;
  height: number;
  numberOfSeats: number;
  kerbWeight: number;
  grossTrainWeight: number | null;
  loadLength: number | null;
  dataVersionNumber: number | null;
  wheelBase: number | null;
  carLength: number;
  width: number;
  numberOfAxles: number;
  grossVehicleWeight: number | null;
  grossCombinedWeight: number | null;

  constructor(data: any) {
    this.unladenWeight = data.UnladenWeight;
    this.rigidArtic = data.RigidArtic;
    this.bodyShape = data.BodyShape;
    this.payloadVolume = data.PayloadVolume;
    this.payloadWeight = data.PayloadWeight;
    this.height = data.Height;
    this.numberOfSeats = data.NumberOfSeats;
    this.kerbWeight = data.KerbWeight;
    this.grossTrainWeight = data.GrossTrainWeight;
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
