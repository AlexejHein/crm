import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private _products = new BehaviorSubject<any>([]);
  currentProducts = this._products.asObservable();

  constructor(private firestore: AngularFirestore) {
    this.loadInitialData();
  }

  loadInitialData() {
    this.firestore.collection('products')
      .valueChanges({idField: 'customIdName'})
      .subscribe((products: any[]) => {
      this._products.next(products);
    });
  }
}
