import { Dvla } from "./Dvla";
import { Smmt } from "./Smmt/Smmt";

export class ClassificationDetails {
  smmt: Smmt;
  dvla: Dvla;

  constructor(data: any) {
    this.smmt = new Smmt(data.Smmt);
    this.dvla = new Dvla(data.Dvla);
  }
}
