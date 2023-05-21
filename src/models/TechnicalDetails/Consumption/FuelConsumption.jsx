export class FuelConsumption {
  lkm;
  mpg;

  constructor(data) {
    this.lkm = data.Lkm;
    this.mpg = data.Mpg;
  }
}

export class ExtraUrban extends FuelConsumption {
  constructor(data) {
    super(data);
  }
}

export class UrbanCold extends FuelConsumption {
  constructor(data) {
    super(data);
  }
}

export class Combined extends FuelConsumption {
  constructor(data) {
    super(data);
  }
}
