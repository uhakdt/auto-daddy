export class YearTwoToSix {
  twelveMonth: object | null;
  sixMonth: object | null;

  constructor(data: any) {
    this.twelveMonth = data.TwelveMonth;
    this.sixMonth = data.SixMonth;
  }
}
