export class Power {
  bhp;
  rpm;
  kw;

  constructor(data) {
    this.bhp = data.Bhp;
    this.rpm = data.Rpm;
    this.kw = data.Kw;
  }
}
