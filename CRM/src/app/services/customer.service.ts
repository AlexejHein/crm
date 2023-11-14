import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private _customers = new BehaviorSubject<any>([]);
  currentCustomers = this._customers.asObservable();

  constructor(private firestore: AngularFirestore) {
    this.loadInitialData();
  }
  private loadInitialData() {
    this.firestore.collection('customers')
      .valueChanges({idField: 'customIdName'})
      .subscribe((costumers: any[]) => {
      this._customers.next(costumers);
    });
  }
}
