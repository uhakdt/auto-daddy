export class Mvris {
  modelCode: string;
  makeCode: string;

  constructor(data: any) {
    this.modelCode = data.ModelCode;
    this.makeCode = data.MakeCode;
  }
}
