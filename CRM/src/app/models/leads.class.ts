export class Lead {
  createdAt: string;
  assignedTo: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  actions?: string;
  comments?: string;
  status?: string;
  source?: string;
  appointmentDate?: Date;

  constructor(obj: any = {}) {
    const {
      createdAt = '',
      assignedTo = '',
      firstName = '',
      lastName = '',
      email = '',
      phoneNumber = '',
      companyName = '',
      actions,
      comments,
      status,
      source,
      appointmentDate,
    } = obj;

    this.createdAt = createdAt;
    this.assignedTo = assignedTo;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.companyName = companyName;
    this.actions = actions;
    this.comments = comments;
    this.status = status;
    this.source = source;
    this.appointmentDate = appointmentDate || null; // Handle Date type separately
  }

  public toJSON() {
    const data = {
      createdAt: this.createdAt ?? null,
      assignedTo: this.assignedTo ?? null,
      firstName: this.firstName ?? null,
      lastName: this.lastName ?? null,
      email: this.email ?? null,
      phoneNumber: this.phoneNumber ?? null,
      companyName: this.companyName ?? null,
      comments: this.comments ?? null,
      actions: this.actions ?? null,
      status: this.status ?? null,
      source: this.source ?? null,
      appointmentDate: this.appointmentDate ?? null
    };

    (Object.keys(data) as Array<keyof typeof data>).forEach(key => {
      if (data[key] === null) {
        delete data[key];
      }
    });

    return data;
  }


}
