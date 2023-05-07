export class V5CCertificateList {
  certificateDate: Date | null;

  constructor(data: any) {
    this.certificateDate = data.CertificateDate;
  }
}
