export class WriteOffDetails {
  writeOffCategory;
  writeOffDate;
  writeOffRecordCount;
  writeOffRecordList;

  constructor(data) {
    this.writeOffCategory = data.WriteOffCategory;
    this.writeOffDate = data.WriteOffDate;
    this.writeOffRecordCount = data.WriteOffRecordCount;
    this.writeOffRecordList = data.WriteOffRecordList;
  }
}
