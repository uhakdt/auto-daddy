export class FirstYear {
  sixMonth: object | null;
  twelveMonth: number | null;

  constructor(data: any) {
    this.sixMonth = data.SixMonth;
    this.twelveMonth = data.TwelveMonth;
  }
}
