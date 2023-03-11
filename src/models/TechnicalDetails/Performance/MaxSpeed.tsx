export class MaxSpeed {
  kph: number;
  mph: number;

  constructor(data: any) {
    this.kph = data.Kph;
    this.mph = data.Mph;
  }
}
