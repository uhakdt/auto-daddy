import { Smmt } from "./Smmt";
import { Dvla } from "./Dvla";
import { Ukvd } from "./Ukvd";

export class ClassificationDetails {
  smmt: Smmt | null;
  dvla: Dvla | null;
  ukvd: Ukvd | null;

  constructor(data: any) {
    this.smmt = data.Smmt ? new Smmt(data.Smmt) : null;
    this.dvla = data.Dvla ? new Dvla(data.Dvla) : null;
    this.ukvd = data.Ukvd ? new Ukvd(data.Ukvd) : null;
  }
}
