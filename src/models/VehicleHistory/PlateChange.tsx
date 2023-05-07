export class PlateChange {
  currentVRM: string | null;
  transferType: string | null;
  dateOfReceipt: string | null;
  previousVRM: string | null;
  dateOfTransaction: string | null;

  constructor(data: any) {
    this.currentVRM = data.CurrentVRM;
    this.transferType = data.TransferType;
    this.dateOfReceipt = data.DateOfReceipt;
    this.previousVRM = data.PreviousVRM;
    this.dateOfTransaction = data.DateOfTransaction;
  }
}
