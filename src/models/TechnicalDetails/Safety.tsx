import { EuroNcap } from "./EuroNcap";

export class Safety {
  euroNcap: EuroNcap | null;

  constructor(data: any) {
    this.euroNcap = data.EuroNcap ? new EuroNcap(data.EuroNcap) : null;
  }
}
