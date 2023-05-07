export class Power {
  bhp: number | null;
  rpm: number | null;
  kw: number | null;

  constructor(data: any) {
    this.bhp = data.Bhp;
    this.rpm = data.Rpm;
    this.kw = data.Kw;
  }
}
