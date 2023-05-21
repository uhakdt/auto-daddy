import { EuroNcap } from "./EuroNcap";

export class Safety {
  euroNcap;

  constructor(data) {
    this.euroNcap = data.EuroNcap ? new EuroNcap(data.EuroNcap) : null;
  }
}
