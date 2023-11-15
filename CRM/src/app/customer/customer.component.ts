import { Component } from '@angular/core';
import { MatDialog} from "@angular/material/dialog";
import {DialogAddCostumerComponent} from "./dialog-add-costumer/dialog-add-costumer.component";
import { Customer } from "../models/customers.class";
import firebase from "firebase/compat";
import firestore = firebase.firestore;
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {CustomerService} from "../services/customer.service";


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {

  costumer = new Customer();
  allCustomers: any[] = [];

  constructor(public dialog: MatDialog,
              private firestore: AngularFirestore,
              private costumerService: CustomerService) {}


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
