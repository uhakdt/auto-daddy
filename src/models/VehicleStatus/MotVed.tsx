import { VedRate } from "./VedRate";

export class MotVed {
  vedRate: VedRate;
  vedCo2Emissions: number;
  motDue: Date | null;
  vedBand: string;
  vedCo2Band: string;
  taxDue: Date | null;
  message: string | null;
  vehicleStatus: string | null;

  constructor(data: any) {
    this.vedRate = new VedRate(data.VedRate);
    this.vedCo2Emissions = data.VedCo2Emissions;
    this.motDue = data.MotDue ? new Date(data.MotDue) : null;
    this.vedBand = data.VedBand;
    this.vedCo2Band = data.VedCo2Band;
    this.taxDue = data.TaxDue ? new Date(data.TaxDue) : null;
    this.message = data.Message;
    this.vehicleStatus = data.VehicleStatus;
  }
}
