import { UkvdEnhancedData } from "./UkvdEnhancedData/UkvdEnhancedData";
import { TechnicalDetails } from "./TechnicalDetails/TechnicalDetails";
import { ClassificationDetails } from "./ClassificationDetails/ClassificationDetails";
import { VehicleStatus } from "./VehicleStatus/VehicleStatus";
import { VehicleHistory } from "./VehicleHistory/VehicleHistory";
import { VehicleRegistration } from "./VehicleRegistration/VehicleRegistration";
import { SmmtDetails } from "./SmmtDetails/SmmtDetails";
import { MotHistory } from "./MotHistory/MotHistory";

export class VehicleBasicData {
  UkvdEnhancedData;
  TechnicalDetails;
  ClassificationDetails;
  VehicleStatus;
  VehicleHistory;
  VehicleRegistrationn;
  SmmtDetails;
  MotHistory;

  constructor(data) {
    this.UkvdEnhancedData = new UkvdEnhancedData(data.UkvdEnhancedData);
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
