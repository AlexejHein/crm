export class Products {
  name: string;
  description: string;
  price: string;

  constructor(obj?: any) {
    this.name = obj ? obj.name : '';
    this.description = obj ? obj.description : '';
    this.price = obj ? obj.price : '';
  }

  public toJSON(){
    return {
      name: this.name,
      description: this.description,
      price: this.price
    }
  }
}
