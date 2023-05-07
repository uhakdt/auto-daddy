export class Torque {
  ftLb: number | null;
  nm: number | null;
  rpm: number;

  constructor(data: any) {
    this.ftLb = data.FtLb;
    this.nm = data.Nm;
    this.rpm = data.Rpm;
  }
}
