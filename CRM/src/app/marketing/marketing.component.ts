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
  recipientEmail: string | undefined;

constructor(public mailTemplateService: MailTemplateService, private firestore: AngularFirestore) {}
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
    const selectedLead = this.allLeads.find(lead => lead.firstName + ' ' + lead.lastName === this.selectedLead);
    if (selectedTemplate && selectedLead) {
      this.selectedTemplateContent = selectedTemplate.templateContent.replace('[name]', selectedLead.firstName);
      this.recipientEmail = selectedLead.email;
    }
  }
  resetTemplate() {
    this.selectedLead = undefined;
    this.selectedTemplateName = undefined;
    this.selectedTemplateContent = undefined;
    this.recipientEmail = undefined;
  }
  sendEmail() {
    console.log('Sending email:', this.selectedTemplateContent);
    this.resetTemplate();
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
