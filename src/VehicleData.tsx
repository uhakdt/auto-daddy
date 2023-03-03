export class VehicleData {
  registrationNumber: string;
  taxStatus: string;
  taxDueDate: Date;
  motStatus: string;
  make: string;
  yearOfManufacture: number;
  engineCapacity: number;
  co2Emissions: number;
  fuelType: string;
  markedForExport: boolean;
  colour: string;
  typeApproval: string;
  dateOfLastV5CIssued: Date;
  motExpiryDate: Date;
  wheelplan: string;
  monthOfFirstRegistration: Date;

  constructor(data: any) {
    this.registrationNumber = data.registrationNumber;
    this.taxStatus = data.taxStatus;
    this.taxDueDate = new Date(data.taxDueDate);
    this.motStatus = data.motStatus;
    this.make = data.make;
    this.yearOfManufacture = data.yearOfManufacture;
    this.engineCapacity = data.engineCapacity;
    this.co2Emissions = data.co2Emissions;
    this.fuelType = data.fuelType;
    this.markedForExport = data.markedForExport;
    this.colour = data.colour;
    this.typeApproval = data.typeApproval;
    this.dateOfLastV5CIssued = new Date(data.dateOfLastV5CIssued);
    this.motExpiryDate = new Date(data.motExpiryDate);
    this.wheelplan = data.wheelplan;
    this.monthOfFirstRegistration = new Date(data.monthOfFirstRegistration);
  }
}
