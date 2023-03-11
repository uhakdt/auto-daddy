import { Torque } from "./Torque";
import { Power } from "./Power";
import { MaxSpeed } from "./MaxSpeed";
import { Acceleration } from "./Acceleration";

export class Performance {
  torque: Torque;
  dataVersionNumber: number | null;
  power: Power;
  maxSpeed: MaxSpeed;
  co2: number;
  acceleration: Acceleration;

  constructor(data: any) {
    this.torque = new Torque(data.Torque);
    this.dataVersionNumber = data.DataVersionNumber;
    this.power = new Power(data.Power);
    this.maxSpeed = new MaxSpeed(data.MaxSpeed);
    this.co2 = data.Co2;
    this.acceleration = new Acceleration(data.Acceleration);
  }
}
