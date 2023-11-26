import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from "@angular/material/dialog";
import { Products } from "../../models/products.class";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
    product = new Products();
    loading = false;
    constructor(private firestore: AngularFirestore, public dialogRef: MatDialogRef<AddProductComponent>) { }
    saveProduct() {
      this.loading = true;
      this.firestore.collection('products').add(this.product.toJSON())
        .then(r => {
          this.loading = false;
        });
      this.dialogRef.close();
    }
}
