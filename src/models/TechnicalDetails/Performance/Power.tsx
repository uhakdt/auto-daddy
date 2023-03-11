export class Power {
  bhp: number;
  rpm: number;
  kw: number;

  constructor(data: any) {
    this.bhp = data.Bhp;
    this.rpm = data.Rpm;
    this.kw = data.Kw;
  }
}
