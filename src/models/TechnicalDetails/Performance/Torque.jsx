export class Torque {
  ftLb;
  nm;
  rpm;

  constructor(data) {
    this.ftLb = data.FtLb;
    this.nm = data.Nm;
    this.rpm = data.Rpm;
  }
}
