export class VehicleFreeData {
  registrationNumber;
  taxStatus;
  taxDueDate;
  motStatus;
  make;
  yearOfManufacture;
  engineCapacity;
  co2Emissions;
  fuelType;
  markedForExport;
  colour;
  typeApproval;
  revenueWeight;
  dateOfLastV5CIssued;
  motExpiryDate;
  wheelplan;
  monthOfFirstRegistration;

  constructor(data) {
    this.registrationNumber = data.registrationNumber;
    this.taxStatus = data.taxStatus;
    this.taxDueDate = data.taxDueDate;
    this.motStatus = data.motStatus;
    this.make = data.make;
    this.yearOfManufacture = data.yearOfManufacture;
    this.engineCapacity = data.engineCapacity;
    this.co2Emissions = data.co2Emissions;
    this.fuelType = data.fuelType;
    this.markedForExport = data.markedForExport;
    this.colour = data.colour;
    this.typeApproval = data.typeApproval;
    this.revenueWeight = data.revenueWeight;
    this.dateOfLastV5CIssued = data.dateOfLastV5CIssued;
    this.motExpiryDate = data.motExpiryDate;
    this.wheelplan = data.wheelplan;
    this.monthOfFirstRegistration = data.monthOfFirstRegistration;
  }
}
