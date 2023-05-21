export class KeeperChanges {
  dateOfTransaction;
  numberOfPreviousKeepers;
  dateOfLastKeeperChange;

  constructor(data) {
    this.dateOfTransaction = data.DateOfTransaction;
    this.numberOfPreviousKeepers = data.NumberOfPreviousKeepers;
    this.dateOfLastKeeperChange = data.DateOfLastKeeperChange;
  }
}
