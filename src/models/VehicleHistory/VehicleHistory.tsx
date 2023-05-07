import { V5CCertificateList } from "./V5CCertificate";
import { KeeperChanges } from "./KeeperChange";
import { PlateChange } from "./PlateChange";

export class VehicleHistory {
  v5CCertificateCount: number | null;
  plateChangeCount: number | null;
  numberOfPreviousKeepers: number | null;
  v5CCertificateList: V5CCertificateList | null;
  keeperChangesCount: number | null;
  vicCount: number | null;
  colourChangeCount: number | null;
  colourChangeList: any | null;
  keeperChangesList: KeeperChanges[] | null;
  plateChangeList: PlateChange[] | null;
  vicList: any | null;

  constructor(data: any) {
    this.v5CCertificateCount = data.V5CCertificateCount;
    this.plateChangeCount = data.PlateChangeCount;
    this.numberOfPreviousKeepers = data.NumberOfPreviousKeepers;
    this.v5CCertificateList = data.V5CCertificateList.map(
      (item: any) => new V5CCertificateList(item)
    );
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
