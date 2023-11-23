import {Component, Inject} from '@angular/core';
import {Task} from "../../models/tasks.class";
import { Customer } from '../../models/customers.class';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import { MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent {
  customer = new Customer();
  allCustomers: any[] = [];
  task: Task = new Task();
  loading = false;
  customIdName: string = '';

  constructor(public dialogRef: MatDialogRef<EditTaskComponent>,private firestore: AngularFirestore, @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.task) {
      this.task = data.task;
      this.customIdName = data.task.customIdName;
    } else {
      console.error('Keine Task-Daten im Dialog');
    }
  }

  ngOnInit(): void {
    this.firestore.collection('customers')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allCustomers = changes;
      });
  }

  saveTask() {
    this.loading = true;
    this.firestore.collection('tasks').doc(this.customIdName).update(this.task).then(() => {
      this.loading = false;
      this.dialogRef.close();
    });
  }
  deleteTask() {
    this.loading = true;
    this.firestore.collection('tasks').doc(this.customIdName).delete().then(() => {
      this.loading = false;
      this.dialogRef.close();
    });
  }
}
