export class EuroNcap {
  child;
  adult;
  pedestrian;

  constructor(data) {
    this.child = data.Child;
    this.adult = data.Adult;
    this.pedestrian = data.Pedestrian;
  }
}
