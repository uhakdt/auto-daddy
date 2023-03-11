import { Mvris } from "./Mvris";

export class Smmt {
  make: string;
  mvris: Mvris;
  trim: string;
  range: string;

  constructor(data: any) {
    this.make = data.Make;
    this.mvris = new Mvris(data.Mvris);
    this.trim = data.Trim;
    this.range = data.Range;
  }
}
