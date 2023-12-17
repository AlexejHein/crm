import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { AngularFirestore} from "@angular/fire/compat/firestore";
import { Task } from "../models/tasks.class";
import { TaskService } from "../services/task.service";
import {MatDialog} from "@angular/material/dialog";
import {AddTaskComponent} from "./add-task/add-task.component";


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit{
  tasks: Task[] = [];
  id: string = '';


  todo: Task[] = [];
  inProgress: Task[] = [];
  awaitingFeedback: Task[] = [];
  done: Task[] = [];


  constructor(private firebase: AngularFirestore, public dialog: MatDialog) {
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


  openDialog() {
    this.dialog.open(AddTaskComponent);
  }


}

