import { V5CCertificateList } from "./V5CCertificate";
import { KeeperChanges } from "./KeeperChange";
import { PlateChange } from "./PlateChange";

export class VehicleHistory {
  v5CCertificateCount;
  plateChangeCount;
  numberOfPreviousKeepers;
  V5CCertificateList;
  keeperChangesCount;
  vicCount;
  colourChangeCount;
  colourChangeList;
  keeperChangesList;
  plateChangeList;
  vicList;

  constructor(data) {
    this.v5CCertificateCount = data.V5CCertificateCount;
    this.plateChangeCount = data.PlateChangeCount;
    this.numberOfPreviousKeepers = data.NumberOfPreviousKeepers;
    this.v5CCertificateList = data.V5CCertificateList.map(
      (item) => new V5CCertificateList(item)
    );
    this.keeperChangesCount = data.KeeperChangesCount;
    this.vicCount = data.VicCount;
    this.colourChangeCount = data.ColourChangeCount;
    this.colourChangeList = data.ColourChangeList;
    this.keeperChangesList = data.KeeperChangesList.map(
      (item) => new KeeperChanges(item)
    );
    this.plateChangeList = data.PlateChangeList.map(
      (item) => new PlateChange(item)
    );
    this.vicList = data.VicList;
  }
}
