import { Record } from "./Record";

export class MotHistory {
  RecordCount;
  RecordList;

  constructor(data) {
    this.RecordCount = data.RecordCount;
    this.RecordList = data.RecordList.map((record) => new Record(record));
  }
}
