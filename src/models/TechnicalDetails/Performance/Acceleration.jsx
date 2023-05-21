export class Acceleration {
  mph;
  kph;
  zeroTo60Mph;
  zeroTo100Kph;

  constructor(data) {
    this.mph = data.Mph;
    this.kph = data.Kph;
    this.zeroTo60Mph = data.ZeroTo60Mph;
    this.zeroTo100Kph = data.ZeroTo100Kph;
  }
}
