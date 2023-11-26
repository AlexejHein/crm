import { Component } from '@angular/core';
import { ActivatedRoute} from "@angular/router";
import { AngularFirestore} from "@angular/fire/compat/firestore";
import { Lead } from "../../models/leads.class";

@Component({
  selector: 'app-dialog-edit-lead',
  templateUrl: './dialog-edit-lead.component.html',
  styleUrls: ['./dialog-edit-lead.component.scss']
})
export class DialogEditLeadComponent {
  leadId = '';
  lead: Lead = new Lead();
  constructor(private route:ActivatedRoute, private firestore: AngularFirestore) {
  }
  ngOnInit() {
    this.route.paramMap.subscribe(paramMap =>{
      this.leadId = paramMap.get('id') || '';
      this.getLead();
    })
  }
  getLead(){
    this.firestore
      .collection('leads')
      .doc(this.leadId).get()
      .subscribe(doc =>{
        this.lead = new Lead(doc.data());
      })
  }
  save(){
    this.firestore
      .collection('leads')
      .doc(this.leadId)
      .update(this.lead.toJSON())
      .then(r =>{
        console.log(r);
      });
  }
}
