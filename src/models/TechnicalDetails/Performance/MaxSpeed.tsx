export class MaxSpeed {
  kph: number | null;
  mph: number | null;

  constructor(data: any) {
    this.kph = data.Kph;
    this.mph = data.Mph;
  }
}
