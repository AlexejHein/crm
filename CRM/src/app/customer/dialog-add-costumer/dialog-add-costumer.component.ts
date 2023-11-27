import { Component } from '@angular/core';
import { Customer} from "../../models/customers.class";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from "@angular/material/dialog";
import { AuthService } from "../../services/auth.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Observable} from "rxjs";
import firebase from "firebase/compat";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dialog-add-costumer',
  templateUrl: './dialog-add-costumer.component.html',
  styleUrls: ['./dialog-add-costumer.component.scss']
})
export class DialogAddCostumerComponent {
  customer = new Customer();
  loading = false;
  hide = true;
  firstName: string | undefined;
  lastName: string | undefined;
  birthDate: number | undefined;
  street: string | undefined;
  zipCode: number | undefined;
  city: string | undefined;
  email: string | undefined;
  password: string | undefined;
  loginForm: FormGroup;
  loginError: string = '';


  private user: Observable<firebase.User | null>;

  constructor(private firestore: AngularFirestore,
              private afAuth: AngularFireAuth,
              private authService: AuthService,
              public dialogRef: MatDialogRef<DialogAddCostumerComponent>,
              private fb: FormBuilder) {
    this.user = afAuth.authState;
    this.loginForm = new FormGroup({
      firstName: new FormControl ('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl ('', [Validators.required, Validators.minLength(2)]),
      birthDate: new FormControl ('', [Validators.required]),
      street: new FormControl ('', [Validators.required, Validators.minLength(2)]),
      zipCode: new FormControl ('', [Validators.required, Validators.minLength(5)]),
      city: new FormControl ('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl ('', [Validators.required, Validators.email]),
      password: new FormControl ('', [Validators.required, Validators.minLength(5)])
    });
  }

  saveCustomer() {
    if (this.loginForm?.valid) {
      this.customer = new Customer(this.loginForm.value);
      this.createUser();
    } else {
      this.loginError = 'Please correct the errors in the form.';
    }

  }
  createUser() {
    this.loading = true;
    this.authService.createUser(this.customer.email, this.customer.password)
      .then(userCredential => {
        this.firestore.collection('customers').add(this.customer.toJSON())
          .then(() => {
            this.loading = false;
            this.dialogRef.close();
          })
          .catch(error => {
            console.error("Fehler beim Speichern der Kundeninformationen", error);
            this.loading = false;
          });
      })
      .catch(error => {
        console.error("Fehler beim Erstellen des Nutzerkontos", error);
        this.loading = false;
      });
  }
}
