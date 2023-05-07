export class KeeperChanges {
  dateOfTransaction: string | null;
  numberOfPreviousKeepers: number | null;
  dateOfLastKeeperChange: string | null;

  constructor(data: any) {
    this.dateOfTransaction = data.DateOfTransaction;
    this.numberOfPreviousKeepers = data.NumberOfPreviousKeepers;
    this.dateOfLastKeeperChange = data.DateOfLastKeeperChange;
  }
}
