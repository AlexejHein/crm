import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuard } from "./services/routeguard.service";
import {CustomerComponent} from "./customer/customer.component";
import {MenuComponent} from "./menu/menu.component";
import {ManagementComponent} from "./management/management.component";
import {HistoryComponent} from "./history/history.component";
import {SalesComponent} from "./sales/sales.component";
import {TaskComponent} from "./task/task.component";
import {MarketingComponent} from "./marketing/marketing.component";
import {CustomerDetailComponent} from "./customer/customer-detail/customer-detail.component";
import {DialogEditLeadComponent} from "./management/dialog-edit-lead/dialog-edit-lead.component";
import {ProductDetailComponent} from "./sales/product-detail/product-detail.component";

const routes: Routes = [
  {
    path:'', component: LoginComponent
  },
  {
    path: 'menu', canActivate: [AuthGuard],
    component: MenuComponent
  },
  {
    path: 'dashboard', canActivate: [AuthGuard],
    component: DashboardComponent
  },
  {
    path: 'customer', canActivate: [AuthGuard],
    component: CustomerComponent
  },
  {
    path: 'management', canActivate: [AuthGuard],
    component: ManagementComponent
  },
  {
    path: 'history', canActivate: [AuthGuard],
    component: HistoryComponent
  },
  {
    path: 'sales', canActivate: [AuthGuard],
    component: SalesComponent
  },
  {
    path: 'task', canActivate: [AuthGuard],
    component: TaskComponent
  },
  {
    path: 'marketing', canActivate: [AuthGuard],
    component: MarketingComponent
  },
  {
    path: 'customer/:id', canActivate: [AuthGuard],
    component: CustomerDetailComponent
  },
  {
    path: 'management/:id', canActivate: [AuthGuard],
    component: DialogEditLeadComponent
  },
  {
    path: 'sales/:id', canActivate: [AuthGuard],
    component: ProductDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
