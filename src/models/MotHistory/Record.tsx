export class Record {
  testNumber: string | null;
  testDate: string | null;
  expiryDate: string | null;
  testResult: string | null;
  odometerReading: number | null;
  odometerUnit: string | null;
  odometerInKilometers: number | null;
  odometerInMiles: number | null;
  mileageSinceLastPass: number | null;
  mileageAnomalyDetected: boolean | null;
  daysSinceLastPass: number | null;
  daysSinceLastTest: number | null;
  daysOutOfMot: number | null;
  isRetest: boolean | null;
  advisoryNoticeCount: number | null;
  dangerousFailureCount: number | null;
  majorFailureCount: number | null;
  hasExtensionPeriod: boolean | null;
  extensionPeriodReason: object | null;
  extensionPeriodAdditionalDays: object | null;
  extensionPeriodOriginalDueDate: object | null;
  advisoryNoticeList: any[] | null;
  failureReasonList: any[] | null;
  annotationDetailsList: any[] | null;

  constructor(data: any) {
    this.testNumber = data.TestNumber;
    this.testDate = data.TestDate;
    this.expiryDate = data.ExpiryDate;
    this.testResult = data.TestResult;
    this.odometerReading = data.OdometerReading;
    this.odometerUnit = data.OdometerUnit;
    this.odometerInKilometers = data.OdometerInKilometers;
    this.odometerInMiles = data.OdometerInMiles;
    this.mileageSinceLastPass = data.MileageSinceLastPass;
    this.mileageAnomalyDetected = data.MileageAnomalyDetected;
    this.daysSinceLastPass = data.DaysSinceLastPass;
    this.daysSinceLastTest = data.DaysSinceLastTest;
    this.daysOutOfMot = data.DaysOutOfMot;
    this.isRetest = data.IsRetest;
    this.advisoryNoticeCount = data.AdvisoryNoticeCount;
    this.dangerousFailureCount = data.DangerousFailureCount;
    this.majorFailureCount = data.MajorFailureCount;
    this.hasExtensionPeriod = data.HasExtensionPeriod;
    this.extensionPeriodReason = data.ExtensionPeriodReason;
    this.extensionPeriodAdditionalDays = data.ExtensionPeriodAdditionalDays;
    this.extensionPeriodOriginalDueDate = data.ExtensionPeriodOriginalDueDate;
    this.advisoryNoticeList = data.AdvisoryNoticeList;
    this.failureReasonList = data.FailureReasonList;
    this.annotationDetailsList = data.AnnotationDetailsList;
  }
}
