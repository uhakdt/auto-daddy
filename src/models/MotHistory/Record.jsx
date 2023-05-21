export class Record {
  testNumber;
  testDate;
  expiryDate;
  testResult;
  odometerReading;
  odometerUnit;
  odometerInKilometers;
  odometerInMiles;
  mileageSinceLastPass;
  mileageAnomalyDetected;
  daysSinceLastPass;
  daysSinceLastTest;
  daysOutOfMot;
  isRetest;
  advisoryNoticeCount;
  dangerousFailureCount;
  majorFailureCount;
  hasExtensionPeriod;
  extensionPeriodReason;
  extensionPeriodAdditionalDays;
  extensionPeriodOriginalDueDate;
  advisoryNoticeList;
  failureReasonList;
  annotationDetailsList;

  constructor(data) {
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
