import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Lead } from '../../models/leads.class';
import { Customer } from '../../models/customers.class';

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
  currentDate:string;
  constructor(public dialogRef: MatDialogRef<DialogAddLeadComponent>, private firestore: AngularFirestore) {
    this.currentDate = new Date().toISOString().substring(0, 10);
  }
  ngOnInit(): void {
    this.firestore.collection('customers')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allCustomers = changes;
      });
    setInterval(() => {
      this.currentDate = new Date().toLocaleString('de-DE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    }, 1000);
  }
  saveLead() {
    this.loading = true;
    this.firestore.collection('leads').add(this.lead.toJSON())
      .then(r => {
        this.lead.updatedAt = this.currentDate;
        this.loading = false;
      });
    this.dialogRef.close();
  }
}
