export class ElectricVehicleBattery {
  capacity;
  chargePort;
  chargeTime;
  type;

  constructor(data) {
    this.capacity = data.Capacity;
    this.chargePort = data.ChargePort;
    this.chargeTime = data.ChargeTime;
    this.type = data.Type;
  }
}
