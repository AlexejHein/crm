import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { AngularFirestore} from "@angular/fire/compat/firestore";
import { Task } from "../models/tasks.class";
import { TaskService } from "../services/task.service";


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit{
  tasks: Task[] = [];
  taskId: string = '';


  todo: Task[] = [];
  inProgress: Task[] = [];
  awaitingFeedback: Task[] = [];
  done: Task[] = [];

  constructor(private firebase: AngularFirestore) {
  }

  ngOnInit() {
    this.firebase.collection('tasks').snapshotChanges().subscribe(res => {

      this.todo = [];
      this.inProgress = [];
      this.awaitingFeedback = [];
      this.done = [];

      res.forEach(taskDoc => {
        let task = taskDoc.payload.doc.data() as Task;
        task.customIdName = taskDoc.payload.doc.id;

        switch (task.status) {
          case 'todo':
            this.todo.push(task);
            break;
          case 'inProgress':
            this.inProgress.push(task);
            break;
          case 'awaitingFeedback':
            this.awaitingFeedback.push(task);
            break;
          case 'done':
            this.done.push(task);
            break;
          default:
            break;
        }
      });
    });
  }


  drop(event: CdkDragDrop<Task[]>) {
    console.log('Drop event:', event);

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

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

      if (movedTask.status !== newStatus) {
        movedTask.status = newStatus;
        this.updateTaskInFirestore(movedTask);
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
      .catch(e => console.error("Update fehlgeschlagen für Task:", task, e));
  }

  openDialog() {
    console.log('open dialog');
  }


}

