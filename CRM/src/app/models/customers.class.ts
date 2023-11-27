export class Customer {
  firstName: string;
  lastName: string;
  birthDate: string;
  street: string;
  zipCode: string;
  city: string;
  email: string;
  sales: number;
  password: string;
  id?: string;

  constructor(obj?: any) {
    if (obj) {
      this.firstName = obj.firstName ?? '';
      this.lastName = obj.lastName ?? '';
      this.birthDate = obj.birthDate ?? '';
      this.street = obj.street ?? '';
      this.zipCode = obj.zipCode ?? '';
      this.city = obj.city ?? '';
      this.email = obj.email ?? '';
      this.sales = obj.sales ?? 0;
      this.password = obj.password ?? '';
    } else {
      this.firstName = '';
      this.lastName = '';
      this.birthDate = '';
      this.street = '';
      this.zipCode = '';
      this.city = '';
      this.email = '';
      this.sales = 0;
      this.password = '';
    }
  }


  public toJSON(){
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      birthDate: this.birthDate,
      street: this.street,
      zipCode: this.zipCode,
      city: this.city,
      email: this.email,
      sales: this.sales,
      password: this.password,
      id: this.id ?? 'Standartwert'
    }
  }
}
