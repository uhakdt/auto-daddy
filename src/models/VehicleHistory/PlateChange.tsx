export class PlateChange {
  currentVRM: string;
  transferType: string;
  dateOfReceipt: string;
  previousVRM: string;
  dateOfTransaction: string;

  constructor(data: any) {
    this.currentVRM = data.CurrentVRM;
    this.transferType = data.TransferType;
    this.dateOfReceipt = data.DateOfReceipt;
    this.previousVRM = data.PreviousVRM;
    this.dateOfTransaction = data.DateOfTransaction;
  }
}
