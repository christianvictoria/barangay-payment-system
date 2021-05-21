import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ViewChild} from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs'

import { MatPaginator } from '@angular/material/paginator';
import { PaymentAddComponent } from '../payment-add/payment-add.component';
import { PaymentViewComponent } from '../payment-view/payment-view.component';
import { PaymentUpdateComponent } from '../payment-update/payment-update.component';
import { PendingPaymentComponent } from '../pending-payment/pending-payment.component';
import { PaymentsService } from 'src/app/payments.service';

import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import Swal from 'sweetalert2';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit { 

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private paymentService: PaymentsService, 
    public dialog: MatDialog, 
    public router: Router 
  ) { }
  displayedColumns: string[] = ['pt_id', 'residents', 'for','amount', 'money recieved', 'date', 'actions'];
  displayedColumns2: string[] = ['pt_id', 'name', 'for','quantity', 'amount', 'money recieved', 'date', 'actions'];
  displayedColumns3: string[] = ['pt_id', 'medicine', 'quantity', 'amount', 'money recieved', 'date', 'actions'];
  isSidebarOpen=true;

  ngOnInit() {
    this.archievedCheckups();
    this.archievedDocuments();
    this.archievedOrders();
    // this.checkups();
    // this.documents();
    // this.orders();
    if(sessionStorage.getItem(("test")) == null){
      this.router.navigate(["/"])
    }

  }

  isCheckupPending: string = "pending";
  isDocuPending: string = "pending";
  isOrderPending: string = "pending";
  // selectCheckup = (value): void => { this.isCheckupPending = value; this.checkups(); }
  // selectDocu = (value): void => { this.isDocuPending = value; this.documents(); }
  // selectOrder = (value): void => { this.isOrderPending = value; this.orders(); }

  checkupsDataSource: any;
  archievedCheckups = async (): Promise<void> => {
    try {
      const response = await this.paymentService.sendDashboardRequest(`payments/archived/checkup/`, null);
      this.checkupsDataSource = new MatTableDataSource(response.payload);
      this.checkupsDataSource.paginator = this.paginator; 
    } catch(error) {
      console.log(error);
    }
  }
  
  documentsDataSource: any;
  archievedDocuments = async (): Promise<void> => {
    try {
      const response = await this.paymentService.sendDashboardRequest(`payments/archived/transaction/`, null);
      this.documentsDataSource = new MatTableDataSource(response.payload);
      this.documentsDataSource.paginator = this.paginator; 
    } catch(error) {
      console.log(error);
    }
  }


  ordersDataSource: any;
  archievedOrders = async (): Promise<void> => {
    try {
      const response = await this.paymentService.sendDashboardRequest(`payments/archived/order/`, null);
      this.ordersDataSource = new MatTableDataSource(response.payload);
      this.ordersDataSource.paginator = this.paginator; 
    } catch(error) {
      console.log(error);
    }
  }

  filterCheckups(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.checkupsDataSource.filter = filterValue.trim().toLowerCase();

    if (this.checkupsDataSource.paginator) {
      this.checkupsDataSource.paginator.firstPage();
    }
  }

  filterDocuments(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.documentsDataSource.filter = filterValue.trim().toLowerCase();

    if (this.documentsDataSource.paginator) {
      this.documentsDataSource.paginator.firstPage();
    }
  }

  filterOrders(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.ordersDataSource.filter = filterValue.trim().toLowerCase();

    if (this.ordersDataSource.paginator) {
      this.ordersDataSource.paginator.firstPage();
    }
  }


  viewRecord(id: number, method: string){
    this.dialog.open(PaymentViewComponent, { data: {'id': id, 'method': method, 'archived': 'archived'}});
  }
  

  openSidebar() {
    this.isSidebarOpen = true;
  }
  closeSidebar() {
    this.isSidebarOpen = false;
  }
  logout(){
    sessionStorage.removeItem("test");
    this.router.navigate(["/"]);
  }
  openDashboard(){
    this.router.navigate(["/dashboard"]);
  }
  openNav1(){
    this.router.navigate(["/nav1"]);
  }
  openNav2(){
    this.router.navigate(["/nav2"]);
  }
  openArchive(){
    this.router.navigate(["/archive"]);
  }


}

  export interface PaymentDashboard {
    no: number;
    name: string;
    daterecorded: string;
    paymentfor: string;
    paymentreceive:number;
    purpose: string;
  }
