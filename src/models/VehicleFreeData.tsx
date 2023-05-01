export class VehicleFreeData {
  registrationNumber: string;
  taxStatus: string;
  taxDueDate: string;
  motStatus: string;
  make: string;
  yearOfManufacture: number;
  engineCapacity: number;
  co2Emissions: number;
  fuelType: string;
  markedForExport: boolean;
  colour: string;
  typeApproval: string;
  revenueWeight: number;
  dateOfLastV5CIssued: string;
  motExpiryDate: string;
  wheelplan: string;
  monthOfFirstRegistration: string;

  constructor(data: any) {
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
