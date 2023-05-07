export class FuelConsumption {
  lkm: number | null;
  mpg: number | null;

  constructor(data: any) {
    this.lkm = data.Lkm;
    this.mpg = data.Mpg;
  }
}

export class ExtraUrban extends FuelConsumption {
  constructor(data: any) {
    super(data);
  }
}

export class UrbanCold extends FuelConsumption {
  constructor(data: any) {
    super(data);
  }
}

export class Combined extends FuelConsumption {
  constructor(data: any) {
    super(data);
  }
}
