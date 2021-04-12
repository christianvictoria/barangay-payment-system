import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { PaymentAddComponent } from '../payment-add/payment-add.component';
import { PaymentViewComponent } from '../payment-view/payment-view.component';
import { PaymentUpdateComponent } from '../payment-update/payment-update.component';
import { PaymentDeleteComponent } from '../payment-delete/payment-delete.component';
import { PendingPaymentComponent } from '../pending-payment/pending-payment.component';

@Component({
  selector: 'app-nav1',
  templateUrl: './nav1.component.html',
  styleUrls: ['./nav1.component.css']
})
export class Nav1Component implements OnInit {

  constructor(public dialog: MatDialog, public router: Router ) { }

  isSidebarOpen=true;

  openSidebar() {
    this.isSidebarOpen = true;
  }
  closeSidebar() {
    this.isSidebarOpen = false;
  }

  ngOnInit(): void {
  }

  logout(){
    this.router.navigate(["/"]);
  }
  openDashboard(){
    this.router.navigate(["/dashboard"]);
  }
  openNav2(){
    this.router.navigate(["/nav2"]);
  }
  openNav3(){
    this.router.navigate(["/nav3"]);
  }
  openNav4(){
    this.router.navigate(["/nav4"]);
  }

  displayedColumns: string[] = ['no', 'name', 'daterecorded', 'paymentfor', 'paymentreceive', 'purpose','actions'];
  dataSource = new MatTableDataSource<PaymentDashboard>(ELEMENT_DATA);

  ViewProject(){
    this.dialog.open(PaymentViewComponent);
  }

  CheckOutProject(){
    this.dialog.open(PendingPaymentComponent);
  }

  UpdateProject(){
    this.dialog.open(PaymentUpdateComponent);
  }

  DeleteProject(){
    this.dialog.open(PaymentDeleteComponent);
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

  const ELEMENT_DATA: PaymentDashboard[] = [
    {no: 1, name: 'John Ezekiel', daterecorded: '02/21/2021', paymentfor: 'Barangay Clearance', paymentreceive: 25.00, purpose: 'School Purpose'},
    {no: 2, name: 'Tracey Solis', daterecorded: '02/25/2021', paymentfor: 'Cedula', paymentreceive: 25.00, purpose: 'Work Purpose'},
    {no: 3, name: 'Jim Caeasar', daterecorded: '02/25/2021', paymentfor: 'Barangay Clearance', paymentreceive: 25.00, purpose: 'Loan Purpose'},
    {no: 4, name: 'Juan Dela Cruz', daterecorded: '02/25/2021', paymentfor: 'Barangay Clearance', paymentreceive: 25.00, purpose: 'Travel Purpose'}
  ];
  
