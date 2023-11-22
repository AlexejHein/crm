import { Component } from '@angular/core';
import { Task} from "../../models/tasks.class";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  task = new Task();
  loading = false;
  constructor(private firestore: AngularFirestore,
              public dialogRef: MatDialogRef<AddTaskComponent>) { }

  saveTask() {
    this.loading = true;
    this.firestore.collection('tasks').add(this.task.toJSON())
      .then(r => {
        this.loading = false;
      });
    this.dialogRef.close();
  }

}
