export class Mvris {
  modelCode: object | null;
  makeCode: object | null;

  constructor(data: any) {
    this.modelCode = data.ModelCode;
    this.makeCode = data.MakeCode;
  }
}
