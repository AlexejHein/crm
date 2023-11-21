import { Component } from '@angular/core';
import { MatDialog} from "@angular/material/dialog";
import { AddProductComponent} from "./add-product/add-product.component";
import { Products } from "../models/products.class";
import firebase from "firebase/compat";
import firestore = firebase.firestore;
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent {

  product = new Products();
  allProducts: any[] = [];

  constructor(public dialog: MatDialog,
              private firestore: AngularFirestore) {}


  ngOnInit(): void {
    this.firestore.collection('products')
      .valueChanges({idField: 'customIdName'})
      .subscribe((changes: any) => {
        this.allProducts = changes;
      });
  }
  openDialog(): void {
    this.dialog.open(AddProductComponent);
  }

}
