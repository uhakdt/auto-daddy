export class VrmFormat {
  isGbGeneralFormat;
  isNiGeneralFormat;

  constructor(data) {
    this.isGbGeneralFormat = data.IsGbGeneralFormat;
    this.isNiGeneralFormat = data.IsNiGeneralFormat;
  }
}
