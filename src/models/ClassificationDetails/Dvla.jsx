export class Dvla {
  model;
  make;

  constructor(data) {
    this.model = data.Model;
    this.make = data.Make;
  }
}
