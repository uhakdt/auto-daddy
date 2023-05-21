export class PlateChange {
  currentVRM;
  transferType;
  dateOfReceipt;
  previousVRM;
  dateOfTransaction;

  constructor(data) {
    this.currentVRM = data.CurrentVRM;
    this.transferType = data.TransferType;
    this.dateOfReceipt = data.DateOfReceipt;
    this.previousVRM = data.PreviousVRM;
    this.dateOfTransaction = data.DateOfTransaction;
  }
}
