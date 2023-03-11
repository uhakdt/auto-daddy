export class YearTwoToSix {
  twelveMonth: number | null;
  sixMonth: number | null;

  constructor(data: any) {
    this.twelveMonth = data.TwelveMonth;
    this.sixMonth = data.SixMonth;
  }
}
