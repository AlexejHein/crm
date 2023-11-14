import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Customer} from "../models/customers.class";
import {MatDialog} from "@angular/material/dialog";
import {DialogEditAddressComponent} from "../dialog-edit-address/dialog-edit-address.component";
import {DialogEditCustomerComponent} from "../dialog-edit-customer/dialog-edit-customer.component";

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit{

  customerId = '';
  customer: Customer = new Customer();

  constructor(private route:ActivatedRoute,
              private firestore: AngularFirestore,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap =>{
      this.customerId = paramMap.get('id') || '';
      this.getUser();
    })
  }
  getUser(){
    this.firestore
      .collection('customers')
      .doc(this.customerId).get()
      .subscribe(doc =>{
        this.customer = new Customer(doc.data());
      })
  }
  editMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent)
    dialog.componentInstance.customer = new Customer(this.customer.toJSON());
    dialog.componentInstance.customerId = this.customerId;
  }
  editCustomerDetail() {
    const dialog = this.dialog.open(DialogEditCustomerComponent)
    dialog.componentInstance.customer = new Customer(this.customer.toJSON());
    dialog.componentInstance.customerId = this.customerId;
  }
}
