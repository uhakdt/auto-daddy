export class StolenDetails {
  stolen;
  stolenContactNumber;
  stolenDate;
  stolenInfoSource;
  stolenMiaftrRecordCount;
  stolenMiaftrRecordList;
  stolenPoliceForce;
  stolenStatus;

  constructor(data) {
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
