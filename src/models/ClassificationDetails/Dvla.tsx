export class Dvla {
  modelCode: string;
  model: string;
  makeCode: string;
  make: string;

  constructor(data: any) {
    this.modelCode = data.ModelCode;
    this.model = data.Model;
    this.makeCode = data.MakeCode;
    this.make = data.Make;
  }
}
