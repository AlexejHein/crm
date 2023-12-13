import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from "@angular/material/dialog";
import { Products } from "../../models/products.class";
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
    productForm: FormGroup;
    product = new Products();
    loading = false;
  constructor(private firestore: AngularFirestore, public dialogRef: MatDialogRef<AddProductComponent>) {
    this.productForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'price': new FormControl(null, [Validators.required, Validators.min(0)])
    });
  }
  saveProduct() {
    if (this.productForm.valid) {
      this.loading = true;
      this.firestore.collection('products').add(this.productForm.value)
        .then(r => {
          this.loading = false;
        });
      this.dialogRef.close();
    }
  }
}
