export class WriteOffDetails {
  writeOffCategory: string | null;
  writeOffDate: string | null;
  writeOffRecordCount: number | null;
  writeOffRecordList: string | null;

  constructor(data: any) {
    this.writeOffCategory = data.WriteOffCategory;
    this.writeOffDate = data.WriteOffDate;
    this.writeOffRecordCount = data.WriteOffRecordCount;
    this.writeOffRecordList = data.WriteOffRecordList;
  }
}
