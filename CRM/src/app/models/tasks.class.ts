export class Task{
  title?: string;
  description?: string;
  priority?: string;
  status?: string;
  customIdName: string;
  assignedTo: string;

  constructor(obj?: any) {
    this.title = obj ? obj.title : '';
    this.description = obj ? obj.description : '';
    this.priority = obj ? obj.priority : '';
    this.status = obj ? obj.status : '';
     this.customIdName = obj ? obj.customIdName : '';
    this.assignedTo = obj ? obj.assignedTo : '';

  }
  public toJSON(){
    return {
      title: this.title,
      description: this.description,
      priority: this.priority,
      status: this.status,
      assignedTo: this.assignedTo,
    }
  }

}
