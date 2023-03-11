export class Standard {
  sixMonth: number;
  twelveMonth: number;

  constructor(data: any) {
    this.sixMonth = data.SixMonth;
    this.twelveMonth = data.TwelveMonth;
  }
}
