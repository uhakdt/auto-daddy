import { ClassificationDetails } from "./ClassificationDetails/ClassificationDetails";
import { MotHistory } from "./MotHistory/MotHistory";
import { SmmtDetails } from "./SmmtDetails/SmmtDetails";
import { TechnicalDetails } from "./TechnicalDetails/TechnicalDetails";
import { VehicleHistory } from "./VehicleHistory/VehicleHistory";
import { VehicleRegistration } from "./VehicleRegistration/VehicleRegistration";
import { VehicleStatus } from "./VehicleStatus/VehicleStatus";

export class VehicleDataFull {
  TechnicalDetails: TechnicalDetails;
  ClassificationDetails: ClassificationDetails;
  VehicleStatus: VehicleStatus;
  VehicleHistory: VehicleHistory;
  VehicleRegistration: VehicleRegistration;
  SmmtDetails: SmmtDetails;
  MotHistory: MotHistory;

  constructor(data: any) {
    this.TechnicalDetails = new TechnicalDetails(data.TechnicalDetails);
    this.ClassificationDetails = new ClassificationDetails(
      data.ClassificationDetails
    );
    this.VehicleStatus = new VehicleStatus(data.VehicleStatus);
    this.VehicleHistory = new VehicleHistory(data.VehicleHistory);
    this.VehicleRegistration = new VehicleRegistration(
      data.VehicleRegistration
    );
    this.SmmtDetails = new SmmtDetails(data.SmmtDetails);
    this.MotHistory = new MotHistory(data.MotHistory);
  }
}
