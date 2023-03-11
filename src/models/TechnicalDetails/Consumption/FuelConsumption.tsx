export class FuelConsumption {
  lkm: number;
  mpg: number;

  constructor(data: any) {
    this.lkm = data.Lkm;
    this.mpg = data.Mpg;
  }
}

export class ExtraUrban extends FuelConsumption {
  // eslint-disable-next-line
  constructor(data: any) {
    super(data);
  }
}

export class UrbanCold extends FuelConsumption {
  // eslint-disable-next-line
  constructor(data: any) {
    super(data);
  }
}

export class Combined extends FuelConsumption {
  // eslint-disable-next-line
  constructor(data: any) {
    super(data);
  }
}
