export class EuroNcap {
  child: number | null;
  adult: number | null;
  pedestrian: number | null;

  constructor(data: any) {
    this.child = data.Child;
    this.adult = data.Adult;
    this.pedestrian = data.Pedestrian;
  }
}
