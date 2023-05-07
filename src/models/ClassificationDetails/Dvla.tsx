export class Dvla {
  model: string | null;
  make: string | null;

  constructor(data: any) {
    this.model = data.Model;
    this.make = data.Make;
  }
}
