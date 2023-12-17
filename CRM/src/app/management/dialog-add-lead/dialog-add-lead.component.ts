import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Lead } from '../../models/leads.class';
import { Customer } from '../../models/customers.class';
import { Observable } from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dialog-add-lead',
  templateUrl: './dialog-add-lead.component.html',
  styleUrls: ['./dialog-add-lead.component.scss']
})
export class DialogAddLeadComponent implements OnInit {
  lead = new Lead();
  customer = new Customer();
  allCustomers: any[] = [];
  loading = false;
  createdAt: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  companyName: string | undefined;
  assignedTo: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  comments: string | undefined;
  leadForm: FormGroup;
  leadError: string = '';


  constructor(public dialogRef: MatDialogRef<DialogAddLeadComponent>, private firestore: AngularFirestore, private fb: FormBuilder) {
    this.leadForm = new FormGroup({
      firstName: new FormControl ('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl ('', [Validators.required, Validators.minLength(2)]),
      assignedTo: new FormControl ('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl ('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl ('', [Validators.required, Validators.minLength(5)]),
      comments: new FormControl (''),
      createdAt: new FormControl ('', [Validators.required]),
      companyName: new FormControl ('')
    });
  }
  ngOnInit(): void {
    this.firestore.collection('customers')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allCustomers = changes;
      });
  }
  createLead() {
    if (this.leadForm?.valid) {
      this.lead = new Lead(this.leadForm.value);
      this.saveLead();
    } else {
      this.leadError = 'Please correct the errors in the form.';
    }
  }
  saveLead() {
    this.loading = true;
    this.firestore.collection('leads').add(this.lead.toJSON())
      .then(r => {
        this.loading = false;
      });
    this.dialogRef.close();
  }


}
