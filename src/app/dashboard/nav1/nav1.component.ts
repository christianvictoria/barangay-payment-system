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
  selector: 'app-nav1',
  templateUrl: './nav1.component.html',
  styleUrls: ['./nav1.component.css']
})
export class Nav1Component implements OnInit {

  constructor(private paymentService: PaymentsService, public dialog: MatDialog, public router: Router ) { }
  displayedColumns: string[] = ['print', 'pt_id', 'residents', 'pt_desc','amount', 'pt_isPayed', 'pt_date', 'actions'];
  displayedColumns2: string[] = ['print', 'pt_id', 'name', 'pt_desc','quantity', 'amount', 'pt_isPayed', 'pt_date', 'actions'];
  isSidebarOpen=true;

  async ngOnInit(): Promise<void> {
    await this.pending();
    await this.paid();
  }

  paymentMethod: string = "checkup";
  payment = (method: string): void => {
    this.paymentMethod = method;
    this.ngOnInit();
  }

  pendingDataSource: any;
  pending = async (): Promise<void> => {
    try {
      const response = await this.paymentService.sendDashboardRequest(`pending/${this.paymentMethod}/0`, null);
      this.pendingDataSource = new MatTableDataSource(response.payload);
    } catch(error) {
      console.log(error);
    }
  }

  paidDataSource: any;
  paid = async (): Promise<void> => {
    try {
      const response = await this.paymentService.sendDashboardRequest(`paid/${this.paymentMethod}/1`, null);
      this.paidDataSource = new MatTableDataSource(response.payload);
    } catch (error) {
      console.log(error);
    }
  }
  
  removeData = async (id: any): Promise<void> => {
    try {
      const data: any = {};
      data.pt_isDeleted = 1;
      const response = await this.paymentService.sendDashboardRequest("updatePayment/" + id +  "/checkup", data);
      if (response.status.remarks == "success") {
        this.pending();
        this.paid();
      }
    } catch(error) {
      console.log(error);
    }
  } 

  payData = async (id: any): Promise<void> => {
    try {
      let data: any = {};
        data.pt_isPayed = 1;
      const response = await this.paymentService.sendDashboardRequest("updatePayment/" + id +  "/checkup", data);
      if (response.status.remarks == "success") {
        await Swal.fire('Success!', 'New payment has been recorded', 'success');
        this.pending();
        this.paid();
      }
    } catch(error) {
      console.log(error);
    }
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
  openPendingTrans(){
    this.router.navigate(["/PendingTransactions"]);
  }

  ViewProject(id){
    this.dialog.open(PaymentViewComponent, {data:id});
    //this.paymentService.SharedData = d;
   // console.log(id)
   
  }

  CheckOutProject(){
    this.dialog.open(PendingPaymentComponent, { data: {"name": "Christian"} });
  }

  UpdateProject(){
    this.dialog.open(PaymentUpdateComponent);
  }

  PrintReceipt(){
    var docDefinition = {
      content: [
      {
        text: 'REPUBLIC OF THE PHILIPPINES',
        fontSize: 15,
        alignment: 'center',
        bold: true,
        margin: [0, 3,0, 3]   
      },
      {
        text: 'CITY OF OLONGAPO',
        fontSize: 15,
        bold: true,
        alignment: 'center',
        margin: [0, 3,0, 3]   
      },
      {
        text: 'BARANGAY',
        fontSize: 15,
        bold: true,
        alignment: 'center',
        margin: [0, 8,0, 8]   
      },
      {
        text: 'OFFICE OF THE PUNONG BARANGAY',
        fontSize: 20,
        bold: true,
        alignment: 'center',
        margin: [0, 5,0, 5]   
      },
      {
        text: 'Official Receipt',
        style: 'sectionHeader'
      },
      {
        columns: [
          [
            { 
              text: 'Mark Jerico Belmonte Fabro',
              style: 'details1' 
            },
            { 
              text: '09876543210',
              style: 'details1' 
            },
            { 
              text: '3A Ligtas Street Barangay Barretto' ,
              style: 'details1'
            },
            { 
              text: 'Payment For: Cedula' ,
              style: 'details1'
            },
            { 
              text: 'Payment Fee: Php 25.00' ,
              style: 'details1'
            },
            { 
              text: 'Tax: Php 0.00' ,
              style: 'details1'
            },
            { 
              text: 'Cash: Php 30.00' ,
              style: 'details1'
            },
            { 
              text: 'Change: Php 5.00' ,
              style: 'details1'
            },
          ],
          [
            {
              text: `Date: ${new Date().toLocaleString()}`,
              alignment: 'right' ,
              style: 'details1'
            },
            { 
              text: `Bill No : ${((Math.random() *1000).toFixed(0))}`,
              alignment: 'right' ,
              style: 'details1'
            }
          ]
        ]
      },
      {
        columns: [
          [{ text: 'Office Stamp', style:'officeStamp' }],
          [{ text: 'Signature', alignment: 'right', italics: true, style:'signature'}],
        ]
      },
      { 
        text: 'Issued In: Barangay Barretto' ,
        style: 'details2'
      },
      { 
        text: 'Receiver: Barangay Official' ,
        style: 'details1'
      },
      {
        text: 'Terms and Conditions',
        style: 'sectionHeader'
      },
      {
          ul: [
            'Terms and Conditions Here',
            'Terms and Conditions Here',
            'Terms and Conditions Here'
          ], 
      }
    ],
    styles: {
      sectionHeader: {
        bold: true,
        fontSize: 18,
        margin: [0, 35,0, 20]          
      },
      details: {
        bold: true,
        fontSize: 14,
        margin: [0, 5,0, 5]          
      },
      details1: {
        fontSize: 14,
        margin: [0, 5,0, 5]          
      },
      details2: {
        fontSize: 14,
        margin: [0, 55,0, 5]          
      },
      signature: {
        fontSize: 14,
        margin: [0, 55,0, 20]          
      },
      officeStamp: {
        bold: true,
        fontSize: 18,
        margin: [0, 55,0, 20]          
      }
    }
  };

    pdfMake.createPdf(docDefinition).open();
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

 
  
