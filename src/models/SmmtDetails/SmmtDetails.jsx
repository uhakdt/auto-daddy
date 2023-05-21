export class SmmtDetails {
  range;
  fuelType;
  engineCapacity;
  marketSectorCode;
  countryOfOrigin;
  modelCode;
  modelVariant;
  dataVersionNumber;
  numberOfGears;
  nominalEngineCapacity;
  marqueCode;
  transmission;
  bodyStyle;
  visibilityDate;
  sysSetupDate;
  marque;
  cabType;
  terminateDate;
  series;
  numberOfDoors;
  driveType;

  constructor(data) {
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
