import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFireAuthModule} from "@angular/fire/compat/auth";
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule} from "@angular/material/card";
import { MatInputModule} from "@angular/material/input";
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatButtonModule} from "@angular/material/button";
import { MatIconModule} from "@angular/material/icon";
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard} from "./services/routeguard.service";
import { AuthService} from "./services/auth.service";
import { MenuComponent } from './menu/menu.component';
import { MatSidenavModule} from "@angular/material/sidenav";
import { MatToolbarModule} from "@angular/material/toolbar";
import { CustomerComponent } from './customer/customer.component';
import { ManagementComponent } from './management/management.component';
import { SalesComponent } from './sales/sales.component';
import { HistoryComponent } from './history/history.component';
import { TaskComponent } from './task/task.component';
import { MarketingComponent } from './marketing/marketing.component';
import { DialogAddCostumerComponent } from './dialog-add-costumer/dialog-add-costumer.component';
import { MatDialogModule} from "@angular/material/dialog";
import { MatDatepickerModule} from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressBarModule} from "@angular/material/progress-bar";
import { MatTooltipModule} from "@angular/material/tooltip";
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { DialogEditAddressComponent } from './dialog-edit-address/dialog-edit-address.component';
import { DialogEditCustomerComponent } from './dialog-edit-customer/dialog-edit-customer.component';
import {MatMenuModule} from "@angular/material/menu";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MenuComponent,
    CustomerComponent,
    ManagementComponent,
    SalesComponent,
    HistoryComponent,
    TaskComponent,
    MarketingComponent,
    DialogAddCostumerComponent,
    CustomerDetailComponent,
    DialogEditAddressComponent,
    DialogEditCustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDialogModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
