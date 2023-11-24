import { Component } from '@angular/core';
import { MailTemplate } from '../models/mailTemplate.class';
import { MailTemplateService } from '../services/mail-template.service';
import { AngularFirestore} from "@angular/fire/compat/firestore";
import { Lead } from "../models/leads.class";


@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.scss']
})
export class MarketingComponent {

  mailTemplate = new MailTemplate();
  allMailTemplates: any[] = [];

  leads: Lead[] = [];
  allLeads: any[] = [];

  selectedLead: string | undefined;
  selectedTemplateName: string | undefined;
  selectedTemplateContent: string | undefined;

constructor(public mailTemplateService: MailTemplateService,
            private firestore: AngularFirestore) {}

  ngOnInit(): void {
  this.firestore.collection('leads').valueChanges( {idField: 'customIdName'}).subscribe((changes: any) => {
    this.allLeads = changes;
  });
  this.firestore.collection('mailTemplates').valueChanges( {idField: 'customIdName'}).subscribe((changes: any) => {
    this.allMailTemplates = changes;
  });

  }

  onTemplateSelect() {
    const selectedTemplate = this.allMailTemplates.find(t => t.templateName === this.selectedTemplateName);
    if (selectedTemplate && this.selectedLead) {
      this.selectedTemplateContent = selectedTemplate.templateContent.replace('[name]', this.selectedLead);
    }
  }



  save() {
    this.firestore
      .collection('mailTemplates')
      .add(this.mailTemplate.toJSON())
      .then(r => {
      console.log('saved');
    })
  }
}
