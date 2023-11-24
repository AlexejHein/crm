export class MailTemplate {
  templateName?: string;
  templateContent?: string;
  createdDate?: string;
  templateId?: any;
    constructor(obj?: any) {
        this.templateName = obj ? obj.templateName : '';
        this.templateContent = obj ? obj.templateContent : '';
        this.createdDate = obj ? obj.createdDate : '';
        this.templateId = obj ? obj.templateId : '';
    }
    toJSON() {
        return {
            templateName: this.templateName,
            templateContent: this.templateContent,
            createdDate: new Date().toISOString(),
        };
    }
}
