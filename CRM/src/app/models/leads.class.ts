export class Lead {
  createdAt: string;
  assignedTo: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  updatedAt: string;
  actions?: string;

  constructor( obj?: any) {
    this.createdAt = obj ? obj.createdAt : '';
    this.assignedTo = obj ? obj.assignedTo : '';
    this.firstName = obj ? obj.firstName : '';
    this.lastName = obj ? obj.lastName : '';
    this.email = obj ? obj.email : '';
    this.phoneNumber = obj ? obj.phoneNumber : '';
    this.companyName = obj ? obj.companyName : '';
    this.updatedAt = obj ? obj.updatedAt : '';
    this.actions = obj ? obj.actions : '';
  }

  public toJSON(){
    return {
      createdAt: this.createdAt,
      assignedTo: this.assignedTo,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      companyName: this.companyName,
      updatedAt: this.updatedAt,
      actions: this.actions
    }
  }
}


