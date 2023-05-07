export class ElectricVehicleBattery {
  capacity: object | null;
  chargePort: object | null;
  chargeTime: object | null;
  type: object | null;

  constructor(data: any) {
    this.capacity = data.Capacity;
    this.chargePort = data.ChargePort;
    this.chargeTime = data.ChargeTime;
    this.type = data.Type;
  }
}
