import { WriteOffDetails } from "./WriteOffDetails";
import { StolenDetails } from "./StolenDetails";
import { FinanceDetails } from "./FinanceDetails";
import { HighRiskDetails } from "./HighRiskDetails";

export class VdiCheckFull {
  writeOffDetails;
  stolenDetails;
  financeDetails;
  highRiskDetails;

  constructor(data) {
    this.writeOffDetails = data.WriteOffDetails
      ? new WriteOffDetails(data.WriteOffDetails)
      : null;
    this.stolenDetails = data.StolenDetails
      ? new StolenDetails(data.StolenDetails)
      : null;
    this.financeDetails = data.FinanceDetails
      ? new FinanceDetails(data.FinanceDetails)
      : null;
    this.highRiskDetails = data.HighRiskDetails
      ? new HighRiskDetails(data.HighRiskDetails)
      : null;
  }
}
