import { Record } from "./Record";

export class MotHistory {
  RecordCount: number;
  RecordList: Record[];

  constructor(data: any) {
    this.RecordCount = data.RecordCount;
    this.RecordList = data.RecordList.map((record: any) => new Record(record));
  }
}
