import { KeeperChanges } from "./KeeperChange";
import { PlateChange } from "./PlateChange";

export class VehicleHistory {
  v5CCertificateCount: number;
  plateChangeCount: number;
  numberOfPreviousKeepers: number;
  v5CCertificateList: any;
  keeperChangesCount: number;
  vicCount: number;
  colourChangeCount: number;
  colourChangeList: any;
  keeperChangesList: KeeperChanges[];
  plateChangeList: PlateChange[];
  vicList: any;

  constructor(data: any) {
    this.v5CCertificateCount = data.V5CCertificateCount;
    this.plateChangeCount = data.PlateChangeCount;
    this.numberOfPreviousKeepers = data.NumberOfPreviousKeepers;
    this.v5CCertificateList = data.V5CCertificateList;
    this.keeperChangesCount = data.KeeperChangesCount;
    this.vicCount = data.VicCount;
    this.colourChangeCount = data.ColourChangeCount;
    this.colourChangeList = data.ColourChangeList;
    this.keeperChangesList = data.KeeperChangesList.map(
      (item: any) => new KeeperChanges(item)
    );
    this.plateChangeList = data.PlateChangeList.map(
      (item: any) => new PlateChange(item)
    );
    this.vicList = data.VicList;
  }
}
