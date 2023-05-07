export class FinanceDetails {
  financeRecordCount: number | null;
  financeRecordList: Array<string> | null;

  constructor(data: any) {
    this.financeRecordCount = data.FinanceRecordCount;
    this.financeRecordList = data.FinanceRecordList;
  }
}
