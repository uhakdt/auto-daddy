export class KeeperChanges {
  dateOfTransaction: string;
  numberOfPreviousKeepers: number;
  dateOfLastKeeperChange: string;

  constructor(data: any) {
    this.dateOfTransaction = data.DateOfTransaction;
    this.numberOfPreviousKeepers = data.NumberOfPreviousKeepers;
    this.dateOfLastKeeperChange = data.DateOfLastKeeperChange;
  }
}
