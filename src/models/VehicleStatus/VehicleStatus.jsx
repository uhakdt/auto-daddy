import { MotVed } from "./MotVed";

export class VehicleStatus {
  motVed;
  nextMotDueDate;
  daysUntilNextMotIsDue;

  constructor(data) {
    this.motVed = data.MotVed ? new MotVed(data.MotVed) : null;
    this.nextMotDueDate = data.NextMotDueDate;
    this.daysUntilNextMotIsDue = data.DaysUntilNextMotIsDue;
  }
}
