import { Component } from '@angular/core';
import { Task} from "../../models/tasks.class";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from "@angular/material/dialog";
import { Customer } from '../../models/customers.class';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  taskForm: FormGroup;
  customer = new Customer();
  allCustomers: any[] = [];
  task = new Task();
  loading = false;
  constructor(private firestore: AngularFirestore, public dialogRef: MatDialogRef<AddTaskComponent>) {
    this.taskForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'priority': new FormControl(null, Validators.required),
      'assignedTo': new FormControl(null, Validators.required),
      'status': new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.firestore.collection('customers')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allCustomers = changes;
      });
  }
  saveTask() {
    if (this.taskForm.valid) {
      this.loading = true;
      this.firestore.collection('tasks').add(this.taskForm.value)
        .then(r => {
          this.loading = false;
        });
      this.dialogRef.close();
    }
  }
}
