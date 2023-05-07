export class Acceleration {
  mph: object | null;
  kph: object | null;
  zeroTo60Mph: object | null;
  zeroTo100Kph: object | null;

  constructor(data: any) {
    this.mph = data.Mph;
    this.kph = data.Kph;
    this.zeroTo60Mph = data.ZeroTo60Mph;
    this.zeroTo100Kph = data.ZeroTo100Kph;
  }
}
