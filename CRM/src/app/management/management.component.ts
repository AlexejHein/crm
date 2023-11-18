import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { LeadService } from "../services/lead.service";
import { Lead } from "../models/leads.class";
import { DialogAddLeadComponent } from "./dialog-add-lead/dialog-add-lead.component";

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['createdAt', 'assignedTo', 'firstName', 'lastName', 'email', 'phoneNumber', 'companyName', 'updatedAt', 'actions'];
  dataSource = new MatTableDataSource<Lead>();

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(
    private dialog: MatDialog,
    private leadService: LeadService
  ) { }

  ngOnInit(): void {
    this.leadService.getLeads().subscribe((data: Lead[]) => {
      this.dataSource.data = data;
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator as MatPaginator;
  }

  open() {
    this.dialog.open(DialogAddLeadComponent);
  }
  deleteLead(leadId: string) {
    this.leadService.deleteLead(leadId).subscribe(() => {
      this.refreshTable();
    });
  }

  refreshTable() {
    this.leadService.getLeads().subscribe((data: Lead[]) => {
      this.dataSource.data = data;
    });
  }
}
