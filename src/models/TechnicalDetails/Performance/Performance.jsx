import { Acceleration } from "./Acceleration";
import { MaxSpeed } from "./MaxSpeed";
import { Power } from "./Power";
import { Torque } from "./Torque";

export class Performance {
  torque;
  noiseLevel;
  dataVersionNumber;
  power;
  maxSpeed;
  co2;
  particles;
  acceleration;

  constructor(data) {
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
