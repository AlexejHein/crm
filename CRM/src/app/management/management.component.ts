import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {PeriodicElement} from "../models/leads.class";
import {DialogAddLeadComponent} from "./dialog-add-lead/dialog-add-lead.component";
import { MatDialogRef} from "@angular/material/dialog";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements AfterViewInit {

  displayedColumns: string[] = ['createdAt', 'assignedTo', 'firstName', 'lastName', 'email', 'phoneNumber', 'companyName', 'updatedAt', 'actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator as MatPaginator;
  }
  constructor(private dialog: MatDialog) { }

  open() {
    this.dialog.open(DialogAddLeadComponent)
  }

}



const ELEMENT_DATA: PeriodicElement[] = [
  {
    createdAt: "2023-11-14", assignedTo: "Mr. Nice", firstName: "John", lastName: "Doe", email: "johndoe@example.com", phoneNumber: "+123456789", companyName: "ABC Inc.", updatedAt: "2023-11-14T15:30:00Z", actions: ""
  },
  {
    createdAt: "2023-11-15", assignedTo: "MRS. Nice", firstName: "Jane", lastName: "Smith", email: "janesmith@example.com", phoneNumber: "+987654321", companyName: "XYZ Corp.", updatedAt: "2023-11-15T10:45:00Z", actions: ""
  },
  {
    createdAt: "2023-11-16", assignedTo: "Dr. Nice", firstName: "Alice", lastName: "Johnson", email: "alice@example.com", phoneNumber: "+111222333", companyName: "DEF Ltd.", updatedAt: "2023-11-16T14:15:00Z", actions: ""
  },
  {
    createdAt: "2023-11-17", assignedTo: "Mr Noname", firstName: "Bob", lastName: "Williams", email: "bob@de.sw", phoneNumber: "+444555666", companyName: "GHI GmbH", updatedAt: "2023-11-17T09:00:00Z", actions: ""
  },
  {
    createdAt: "2023-11-18", assignedTo: "Mrs Noname", firstName: "Eve", lastName: "Brown", email: "Eve@b.de", phoneNumber: "+777888999", companyName: "JKL AG", updatedAt: "2023-11-18T16:30:00Z", actions: ""
  },
  {
    createdAt: "2023-11-19", assignedTo: "Dr Noname", firstName: "Chuck", lastName: "Miller", email: "chuk@aol.de", phoneNumber: "+000111222", companyName: "MNO GmbH", updatedAt: "2023-11-19T11:00:00Z", actions: ""
  },
  {
    createdAt: "2023-11-20", assignedTo: "Mr. Nice", firstName: "John", lastName: "Doe", email: "dude@al.fr", phoneNumber: "+333444555", companyName: "PQR AG", updatedAt: "2023-11-20T13:45:00Z", actions: ""
  },
  {
    createdAt: "2023-11-14", assignedTo: "Mr. Nice", firstName: "John", lastName: "Doe", email: "johndoe@example.com", phoneNumber: "+123456789", companyName: "ABC Inc.", updatedAt: "2023-11-14T15:30:00Z", actions: ""
  },
  {
    createdAt: "2023-11-15", assignedTo: "MRS. Nice", firstName: "Jane", lastName: "Smith", email: "janesmith@example.com", phoneNumber: "+987654321", companyName: "XYZ Corp.", updatedAt: "2023-11-15T10:45:00Z", actions: ""
  },
  {
    createdAt: "2023-11-16", assignedTo: "Dr. Nice", firstName: "Alice", lastName: "Johnson", email: "alice@example.com", phoneNumber: "+111222333", companyName: "DEF Ltd.", updatedAt: "2023-11-16T14:15:00Z", actions: ""
  },
  {
    createdAt: "2023-11-17", assignedTo: "Mr Noname", firstName: "Bob", lastName: "Williams", email: "bob@de.sw", phoneNumber: "+444555666", companyName: "GHI GmbH", updatedAt: "2023-11-17T09:00:00Z", actions: ""
  },
  {
    createdAt: "2023-11-18", assignedTo: "Mrs Noname", firstName: "Eve", lastName: "Brown", email: "Eve@b.de", phoneNumber: "+777888999", companyName: "JKL AG", updatedAt: "2023-11-18T16:30:00Z", actions: ""
  },
  {
    createdAt: "2023-11-19", assignedTo: "Dr Noname", firstName: "Chuck", lastName: "Miller", email: "chuk@aol.de", phoneNumber: "+000111222", companyName: "MNO GmbH", updatedAt: "2023-11-19T11:00:00Z", actions: ""
  },
  {
    createdAt: "2023-11-20", assignedTo: "Mr. Nice", firstName: "John", lastName: "Doe", email: "dude@al.fr", phoneNumber: "+333444555", companyName: "PQR AG", updatedAt: "2023-11-20T13:45:00Z", actions: ""
  },
];
