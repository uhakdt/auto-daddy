import { Acceleration } from "./Acceleration";
import { MaxSpeed } from "./MaxSpeed";
import { Power } from "./Power";
import { Torque } from "./Torque";

export class Performance {
  torque: Torque | null;
  noiseLevel: object | null;
  dataVersionNumber: object | null;
  power: Power | null;
  maxSpeed: MaxSpeed | null;
  co2: number | null;
  particles: object | null;
  acceleration: Acceleration | null;

  constructor(data: any) {
    this.torque = data.Torque ? new Torque(data.Torque) : null;
    this.noiseLevel = data.NoiseLevel;
    this.dataVersionNumber = data.DataVersionNumber;
    this.power = data.Power ? new Power(data.Power) : null;
    this.maxSpeed = data.MaxSpeed ? new MaxSpeed(data.MaxSpeed) : null;
    this.co2 = data.Co2;
    this.particles = data.Particles;
    this.acceleration = data.Acceleration
      ? new Acceleration(data.Acceleration)
      : null;
  }
}
