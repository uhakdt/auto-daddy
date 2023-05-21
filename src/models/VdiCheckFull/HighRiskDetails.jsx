export class HighRiskDetails {
  highRiskRecordCount;
  highRiskRecordList;

  constructor(data) {
    this.highRiskRecordCount = data.HighRiskRecordCount;
    this.highRiskRecordList = data.HighRiskRecordList;
  }
}
