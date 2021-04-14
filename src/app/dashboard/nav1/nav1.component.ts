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
import { PaymentsService } from 'src/app/payments.service';

@Component({
  selector: 'app-nav1',
  templateUrl: './nav1.component.html',
  styleUrls: ['./nav1.component.css']
})
export class Nav1Component implements OnInit {

  constructor(private ds: PaymentsService, public dialog: MatDialog, public router: Router ) { }
  a: any;
  pulledData: any[] = [];
  isSidebarOpen=true;
  ptID:any;
  checkupID:any;
  transID:any;
  ptDesc:any;
  ptMoney:any;
  ptDate:any;
  ptPayed:any;
  ptDeleted:any;

  ngOnInit(): void {
    this.getData();
    
  }


  getData(): void {
    this.ds.sendAPIRequest("payments/", null).subscribe(data => {
      this.pulledData = data.payload
      this.dataSource = new MatTableDataSource(this.pulledData)
      console.log(data.payload)
    })
  }

  openSidebar() {
    this.isSidebarOpen = true;
  }
  closeSidebar() {
    this.isSidebarOpen = false;
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

  displayedColumns: string[] = ['pt_id', 'residents', 'pt_date', 'pt_desc', 'pt_money_recieved', 'pt_isPayed','actions'];
  dataSource = new MatTableDataSource(this.pulledData)

  ViewProject(d){
    this.dialog.open(PaymentViewComponent);
    this.ds.SharedData = d;
    
   
  }

  CheckOutProject(){
    this.dialog.open(PendingPaymentComponent, { data: {"name": "Christian"} });
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

 
  
