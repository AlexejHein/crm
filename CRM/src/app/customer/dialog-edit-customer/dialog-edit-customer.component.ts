import {Component, OnInit} from '@angular/core';
import {Customer} from "../../models/customers.class";
import {MatDialogRef} from "@angular/material/dialog";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-customer.component.html',
  styleUrls: ['./dialog-edit-customer.component.scss']
})
export class DialogEditCustomerComponent implements OnInit{

  customer: Customer = new Customer();
  loading = false;
  customerId :string = '';


  constructor(public dialogRef: MatDialogRef<DialogEditCustomerComponent>,private firestore: AngularFirestore) {
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
