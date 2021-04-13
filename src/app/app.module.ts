import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login/login.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatPaginatorModule } from '@angular/material/paginator';
import { ChartsModule } from 'ng2-charts';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { pdfMakeModule } from "pdfmake/build/pdfmake";  
import { pdfFontsModule } from "pdfmake/build/vfs_fonts";  
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Nav1Component } from './dashboard/nav1/nav1.component';
import { Nav2Component } from './dashboard/nav2/nav2.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaymentAddComponent } from './dashboard/payment-add/payment-add.component';
import { PaymentViewComponent } from './dashboard/payment-view/payment-view.component';
import { ExpenseAddComponent } from './dashboard/expense-add/expense-add.component';
import { ExpenseViewComponent } from './dashboard/expense-view/expense-view.component';
import { PaymentUpdateComponent } from './dashboard/payment-update/payment-update.component';
import { PaymentDeleteComponent } from './dashboard/payment-delete/payment-delete.component';
import { ExpenseDeleteComponent } from './dashboard/expense-delete/expense-delete.component';
import { ExpenseUpdateComponent } from './dashboard/expense-update/expense-update.component';
import { PaymentModalComponent } from './dashboard/payment-modal/payment-modal.component';
import { ExpenseModalComponent } from './dashboard/expense-modal/expense-modal.component';
import { PendingPaymentComponent } from './dashboard/pending-payment/pending-payment.component';
import { PendingExpenseComponent } from './dashboard/pending-expense/pending-expense.component';
import { CheckoutPaymentComponent } from './dashboard/checkout-payment/checkout-payment.component';
import { CheckoutExpenseComponent } from './dashboard/checkout-expense/checkout-expense.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    Nav1Component,
    Nav2Component,
    LoginComponent,
    PaymentAddComponent,
    PaymentViewComponent,
    ExpenseAddComponent,
    ExpenseViewComponent,
    PaymentUpdateComponent,
    PaymentDeleteComponent,
    ExpenseDeleteComponent,
    ExpenseUpdateComponent,
    PaymentModalComponent,
    ExpenseModalComponent,
    PendingPaymentComponent,
    PendingExpenseComponent,
    CheckoutPaymentComponent,
    CheckoutExpenseComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    FormsModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    MatSelectModule,
    MatDialogModule,
    MatSidenavModule,
    MatGridListModule,
    ChartsModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }