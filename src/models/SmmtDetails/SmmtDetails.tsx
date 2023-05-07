export class SmmtDetails {
  range: string | null;
  fuelType: string | null;
  engineCapacity: string | null;
  marketSectorCode: string | null;
  countryOfOrigin: string | null;
  modelCode: string | null;
  modelVariant: string | null;
  dataVersionNumber: object | null;
  numberOfGears: number | null;
  nominalEngineCapacity: number | null;
  marqueCode: string | null;
  transmission: string | null;
  bodyStyle: string | null;
  visibilityDate: string | null;
  sysSetupDate: string | null;
  marque: string | null;
  cabType: string | null;
  terminateDate: string | null;
  series: string | null;
  numberOfDoors: number | null;
  driveType: string | null;

  constructor(data: any) {
    this.range = data.Range;
    this.fuelType = data.FuelType;
    this.engineCapacity = data.EngineCapacity;
    this.marketSectorCode = data.MarketSectorCode;
    this.countryOfOrigin = data.CountryOfOrigin;
    this.modelCode = data.ModelCode;
    this.modelVariant = data.ModelVariant;
    this.dataVersionNumber = data.DataVersionNumber;
    this.numberOfGears = data.NumberOfGears;
    this.nominalEngineCapacity = data.NominalEngineCapacity;
    this.marqueCode = data.MarqueCode;
    this.transmission = data.Transmission;
    this.bodyStyle = data.BodyStyle;
    this.visibilityDate = data.VisibilityDate;
    this.sysSetupDate = data.SysSetupDate;
    this.marque = data.Marque;
    this.cabType = data.CabType;
    this.terminateDate = data.TerminateDate;
    this.series = data.Series;
    this.numberOfDoors = data.NumberOfDoors;
    this.driveType = data.DriveType;
  }
}
