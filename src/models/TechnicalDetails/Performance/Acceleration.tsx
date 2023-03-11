export class Acceleration {
  mph: number | null;
  kph: number | null;

  constructor(data: any) {
    this.mph = data.Mph;
    this.kph = data.Kph;
  }
}
