import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MailTemplateService {
  private _mailTemplates = new BehaviorSubject<any>([]);
  currentMailTemplates = this._mailTemplates.asObservable();


  constructor(private firestore: AngularFirestore) {
    this.loadInitialData();
  }

  loadInitialData() {
    this.firestore.collection('mailTemplates')
      .valueChanges({idField: 'customIdName'})
      .subscribe((mailTemplates: any[]) => {
      this._mailTemplates.next(mailTemplates);
    });
  }
}
