import { Component, Input } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {Task} from "../../models/tasks.class";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {MatDialog} from "@angular/material/dialog";
import { EditTaskComponent} from "../edit-task/edit-task.component";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  @Input() title: string | undefined;
  @Input() tasks!: any[] | undefined;
  @Input() listId: string | undefined;
  @Input() taskId: string = '';


  constructor(private firebase: AngularFirestore, public dialog: MatDialog) { }


  drop(event: CdkDragDrop<any[] | undefined, any>) {
    console.log('Drop event:', event);

    if (event.previousContainer === event.container) {
      if (event.container.data) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      }
    } else {
      if (event.previousContainer.data && event.container.data) {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }

      if (event.container.data) {
        const movedTask = event.container.data[event.currentIndex];
        console.log('Verschobene Task:', movedTask);
        console.log('Container ID:', event.container.id);

        let newStatus = '';
        switch (event.container.id) {
          case 'todoList':
            newStatus = 'todo';
            break;
          case 'inProgressList':
            newStatus = 'inProgress';
            break;
          case 'awaitingFeedbackList':
            newStatus = 'awaitingFeedback';
            break;
          case 'doneList':
            newStatus = 'done';
            break;
          default:
            console.error('Unbekannte Liste', event.container.id);
            return;
        }

        if (movedTask && movedTask.status !== newStatus) {
          movedTask.status = newStatus;
          this.updateTaskInFirestore(movedTask);
        }
      }
    }
  }

  updateTaskInFirestore(task: Task) {
    if (!task.customIdName) {
      console.error('Task hat keine gültige ID:', task);
      return;
    }

    this.firebase.collection('tasks').doc(task.customIdName).update(task)
      .then(() => console.log("Update erfolgreich für Task:", task))
      .catch((e: any) => console.error("Update fehlgeschlagen für Task:", task, e));
  }


    edit(task: Task) {
      const dialogRef = this.dialog.open(EditTaskComponent, {
        data: { task: task }
      });
    console.log(task.customIdName);
  }



}
