import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Customer} from "../../models/customers.class";
import {MatDialog} from "@angular/material/dialog";
import {DialogEditAddressComponent} from "../dialog-edit-address/dialog-edit-address.component";
import {DialogEditCustomerComponent} from "../dialog-edit-customer/dialog-edit-customer.component";
import { Task } from '../../models/tasks.class';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit{

  customerId = '';
  customer: Customer = new Customer();
  tasks: Task[] = [];
  taskCount = 0;
  leads: any[] = [];

  constructor(private route:ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap =>{
      this.customerId = paramMap.get('id') || '';
      this.getUser();
    });
  }
  getCustomerTasks() {
    this.firestore.collection('tasks', ref => ref.where('assignedTo', '==', this.customer.firstName + ' ' + this.customer.lastName))
      .get().subscribe(snapshot => {
      this.tasks = snapshot.docs.map(doc => new Task(doc.data()));
      this.taskCount = this.tasks.length;
    });
  }
  getUser(){
    this.firestore
      .collection('customers')
      .doc(this.customerId).get()
      .subscribe(doc =>{
        this.customer = new Customer(doc.data());
        this.getCustomerTasks();
        this.getCustomerLeads();
      })
  }
  getCustomerLeads() {
    this.firestore.collection('leads', ref => ref
      .where('assignedTo', '==', this.customer.firstName + ' ' + this.customer.lastName))
      .get().subscribe(snapshot => {
      this.leads = snapshot.docs.map(doc => {
        const data = doc.data() as any;
        if (data.appointmentDate && data.appointmentDate.seconds) {
          data.appointmentDate = new Date(data.appointmentDate.seconds * 1000);
        } else {
          data.appointmentDate = null;
        }
        return data;
      });
    });
  }
  editMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent)
    dialog.componentInstance.customer = new Customer(this.customer.toJSON());
    dialog.componentInstance.customerId = this.customerId;
  }
  editCustomerDetail() {
    const dialog = this.dialog.open(DialogEditCustomerComponent)
    dialog.componentInstance.customer = new Customer(this.customer.toJSON());
    dialog.componentInstance.customerId = this.customerId;
  }

}
