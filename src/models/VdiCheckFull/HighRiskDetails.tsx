export class HighRiskDetails {
  highRiskRecordCount: number | null;
  highRiskRecordList: Array<string> | null;

  constructor(data: any) {
    this.highRiskRecordCount = data.HighRiskRecordCount;
    this.highRiskRecordList = data.HighRiskRecordList;
  }
}
