import { Component } from '@angular/core';
import { Customer} from "../../models/customers.class";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-add-costumer',
  templateUrl: './dialog-add-costumer.component.html',
  styleUrls: ['./dialog-add-costumer.component.scss']
})
export class DialogAddCostumerComponent {
  customer = new Customer();
  loading = false;
  constructor(private firestore: AngularFirestore,
              public dialogRef: MatDialogRef<DialogAddCostumerComponent>) { }

  saveCustomer() {
    this.loading = true;
    this.firestore.collection('customers').add(this.customer.toJSON())
      .then(r => {
        this.loading = false;
      });
    this.dialogRef.close();
  }
}
