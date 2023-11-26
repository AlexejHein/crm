import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import  {AngularFirestore } from "@angular/fire/compat/firestore";
import { Products } from "../../models/products.class";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
    productId = '';
    product: Products = new Products();
    constructor(private route: ActivatedRoute, private firestore: AngularFirestore) {
    }
    ngOnInit() {
      this.route.paramMap.subscribe(paramMap => {
        this.productId = paramMap.get('id') || '';
        this.getUser();
      })
    }
    getUser() {
      this.firestore
        .collection('products')
        .doc(this.productId).get()
        .subscribe(doc => {
          this.product = new Products(doc.data());
        })
    }
}
