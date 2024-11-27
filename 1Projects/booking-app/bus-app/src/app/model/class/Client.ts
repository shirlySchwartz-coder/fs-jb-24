export class Client {
  clientId: number;
  contactPersonName: string;
  companyName: string;
  address: string;
  city: string;
  pincode: string;
  state: string;
  employeeStrength: number;
  gstNo: string;
  contactNo: string;
  regNo: string;

  constructor() {
    this.clientId = 0;
    this.employeeStrength = 0;
    this.contactPersonName = '';
    this.companyName = '';
    this.address = '';
    this.city = '';
    this.pincode = '';
    this.state = '';
    this.contactNo = '';
    this.gstNo = '';
    this.regNo = '';
  }
}
