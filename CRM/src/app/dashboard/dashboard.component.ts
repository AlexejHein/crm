import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Customer } from "../models/customers.class";
import { Task } from "../models/tasks.class";
import { Lead } from "../models/leads.class";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  lead = new Lead();
  task = new Task();
  customer = new Customer();
  allCustomers: any[] = [];
  allTasks: Task[] = [];
  leads: Lead[] = [];

  public customerChart: any;
  public taskChart: any;

  constructor(private firestore: AngularFirestore) {
    this.firestore.collection('customers')
      .valueChanges({idField: 'customIdName'})
      .subscribe((changes: any) => {
        this.allCustomers = changes;
        this.createCustomerChart();
      });

    this.firestore.collection('tasks')
      .valueChanges()
      .subscribe((changes: any) => {
        this.allTasks = changes;
        this.createTaskChart();
      });
    this.firestore.collection('leads').valueChanges().subscribe((leads: any[]) => {
      this.leads = leads.map(lead => ({
        ...lead,
        appointmentDate: this.convertToDate(lead.appointmentDate)
      }));
    });
  }
  convertToDate(appointmentDate: any): Date | null {
    if (appointmentDate?.toDate) {
      return appointmentDate.toDate();
    } else if (typeof appointmentDate === 'string') {
      const date = new Date(appointmentDate);
      return isNaN(date.getTime()) ? null : date;
    }
    return null;
  }
  createCustomerChart() {
    const customerNames = this.allCustomers.map(customer => customer.lastName);
    const customerSales = this.allCustomers.map(customer => customer.sales);
    this.customerChart = new Chart("customerChartCanvas", {
      type: 'bar',
      data: {
        labels: customerNames,
        datasets: [{ label: 'Sales',
          data: customerSales,
          backgroundColor: 'rgba(112,130,210,0.5)'
        }
          ]
      },
      options: { aspectRatio: 2.5, scales: { y: { beginAtZero: true } } }
    });
  }
  countTasksByPriority(priority: string) {
    return this.allTasks.filter(task => task.priority === priority).length;
  }
  createTaskChart() {
    const lowCount = this.countTasksByPriority('low');
    const mediumCount = this.countTasksByPriority('medium');
    const urgentCount = this.countTasksByPriority('urgent');
    this.taskChart = new Chart("taskChartCanvas", {
      type: 'doughnut',
      data: {
        labels: ['Low', 'Medium', 'Urgent'],
        datasets: [{
          data: [lowCount, mediumCount, urgentCount],
          backgroundColor: ['rgba(184,245,123,0.5)', 'rgba(255,221,0,0.5)', 'rgba(255,0,47,0.5)']
        }]
      },
      options: {
        responsive: true,
      }
    });
  }
}
