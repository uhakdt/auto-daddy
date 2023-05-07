import { MotVed } from "./MotVed";

export class VehicleStatus {
  motVed: MotVed | null;
  nextMotDueDate: string | null;
  daysUntilNextMotIsDue: number | null;

  constructor(data: any) {
    this.motVed = data.MotVed ? new MotVed(data.MotVed) : null;
    this.nextMotDueDate = data.NextMotDueDate;
    this.daysUntilNextMotIsDue = data.DaysUntilNextMotIsDue;
  }
}
