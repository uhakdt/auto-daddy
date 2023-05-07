export class VrmFormat {
  isGbGeneralFormat: boolean | null;
  isNiGeneralFormat: boolean | null;

  constructor(data: any) {
    this.isGbGeneralFormat = data.IsGbGeneralFormat;
    this.isNiGeneralFormat = data.IsNiGeneralFormat;
  }
}
