import { Mvris } from "./Mvris";

export class Smmt {
  make: string | null;
  mvris: Mvris | null;
  trim: string | null;
  range: string | null;

  constructor(data: any) {
    this.make = data.Make;
    this.mvris = data.Mvris ? new Mvris(data.Mvris) : null;
    this.trim = data.Trim;
    this.range = data.Range;
  }
}
