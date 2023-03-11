import { Engine } from "./Engine";

export class General {
  engine: Engine;
  powerDelivery: string;
  typeApprovalCategory: string;
  drivingAxle: string;
  dataVersionNumber: number | null;
  euroStatus: string;

  constructor(data: any) {
    this.engine = new Engine(data.Engine);
    this.powerDelivery = data.PowerDelivery;
    this.typeApprovalCategory = data.TypeApprovalCategory;
    this.drivingAxle = data.DrivingAxle;
    this.dataVersionNumber = data.DataVersionNumber;
    this.euroStatus = data.EuroStatus;
  }
}
