import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {from, Observable} from 'rxjs';
import { Lead } from '../models/leads.class';

@Injectable({
  providedIn: 'root'
})
export class LeadService {
  constructor(private firestore: AngularFirestore) {}

  getLeads(): Observable<Lead[]> {
    return this.firestore.collection<Lead>('leads').valueChanges({ idField: 'id' });
  }
  deleteLead(leadId: string): Observable<void> {
    return from(this.firestore.collection('leads').doc(leadId).delete());
  }
}
