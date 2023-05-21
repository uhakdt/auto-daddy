export class FinanceDetails {
  financeRecordCount;
  financeRecordList;

  constructor(data) {
    this.financeRecordCount = data.FinanceRecordCount;
    this.financeRecordList = data.FinanceRecordList;
  }
}
