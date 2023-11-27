import { Component } from '@angular/core';
import { MatDialog} from "@angular/material/dialog";
import {DialogAddCostumerComponent} from "./dialog-add-costumer/dialog-add-costumer.component";
import { Customer } from "../models/customers.class";
import {AngularFirestore} from "@angular/fire/compat/firestore";


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {
  customer = new Customer();
  allCustomers: any[] = [];

  constructor(public dialog: MatDialog, private firestore: AngularFirestore) {}
  ngOnInit(): void {
    this.firestore.collection('customers')
      .valueChanges({idField: 'customIdName'})
      .subscribe((changes: any) => {
        this.allCustomers = changes;
      });
  }
  openDialog(): void {
    this.dialog.open(DialogAddCostumerComponent);
  }
}
