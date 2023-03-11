export class Torque {
  ftLb: number;
  nm: number;
  rpm: number;

  constructor(data: any) {
    this.ftLb = data.FtLb;
    this.nm = data.Nm;
    this.rpm = data.Rpm;
  }
}
