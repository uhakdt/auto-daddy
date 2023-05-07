export class StolenDetails {
  stolen: boolean | null;
  stolenContactNumber: string | null;
  stolenDate: string | null;
  stolenInfoSource: string | null;
  stolenMiaftrRecordCount: number | null;
  stolenMiaftrRecordList: string | null;
  stolenPoliceForce: string | null;
  stolenStatus: string | null;

  constructor(data: any) {
    this.stolen = data.Stolen;
    this.stolenContactNumber = data.StolenContactNumber;
    this.stolenDate = data.StolenDate;
    this.stolenInfoSource = data.StolenInfoSource;
    this.stolenMiaftrRecordCount = data.StolenMiaftrRecordCount;
    this.stolenMiaftrRecordList = data.StolenMiaftrRecordList;
    this.stolenPoliceForce = data.StolenPoliceForce;
    this.stolenStatus = data.StolenStatus;
  }
}
