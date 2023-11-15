import { Component, OnInit } from '@angular/core';
import {Customer} from "../../models/customers.class";
import {MatDialogRef} from "@angular/material/dialog";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {doc} from "@angular/fire/firestore";

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent implements OnInit{

  customer: Customer = new Customer();
  loading = false;
  customerId :string = '';



  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>, private firestore: AngularFirestore) {
  }


  ngOnInit(): void {

  }
  saveUser(){
    this.loading = true;
    this.firestore
      .collection('customers')
      .doc(this.customerId)
      .update(this.customer.toJSON())
      .then(r =>{
        this.loading = false;
        this.dialogRef.close();
      });
  }

}
