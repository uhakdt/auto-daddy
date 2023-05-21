import { Mvris } from "./Mvris";

export class Smmt {
  make;
  mvris;
  trim;
  range;

  constructor(data) {
    this.make = data.Make;
    this.mvris = data.Mvris ? new Mvris(data.Mvris) : null;
    this.trim = data.Trim;
    this.range = data.Range;
  }
}
