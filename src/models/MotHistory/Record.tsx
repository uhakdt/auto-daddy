export class Record {
  TestDate: string;
  ExpiryDate: string | null;
  TestResult: string;
  OdometerReading: number;
  TestNumber: string;
  AdvisoryNoticeList: string[];
  FailureReasonList: string[];

  constructor(data: any) {
    this.TestDate = data.TestDate;
    this.ExpiryDate = data.ExpiryDate;
    this.TestResult = data.TestResult;
    this.OdometerReading = data.OdometerReading;
    this.TestNumber = data.TestNumber;
    this.AdvisoryNoticeList = data.AdvisoryNoticeList || [];
    this.FailureReasonList = data.FailureReasonList || [];
  }
}
