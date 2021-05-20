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
  displayedColumns: string[] = ['print', 'pt_id', 'residents', 'for','amount', 'money recieved', 'date', 'actions'];
  displayedColumns2: string[] = ['print', 'pt_id', 'name', 'for','quantity', 'amount', 'money recieved', 'date', 'actions'];
  displayedColumns3: string[] = ['print', 'pt_id', 'medicine', 'quantity', 'amount', 'money recieved', 'date', 'actions'];
  isSidebarOpen=true;

  ngOnInit() {
    this.checkups();
    this.documents();
    this.orders();
  }

  isCheckupPending: string = "pending";
  isDocuPending: string = "pending";
  isOrderPending: string = "pending";
  selectCheckup = (value): void => { this.isCheckupPending = value; this.checkups(); }
  selectDocu = (value): void => { this.isDocuPending = value; this.documents(); }
  selectOrder = (value): void => { this.isOrderPending = value; this.orders(); }

  checkupsDataSource: any;
  checkups = async (): Promise<void> => {
    try {
      let number: number = 0;
      (this.isCheckupPending === "pending") ? number = 0 : number = 1;
      const response = await this.paymentService.sendDashboardRequest(`${this.isCheckupPending}/checkup/${number}`, null);
      this.checkupsDataSource = new MatTableDataSource(response.payload);
    } catch(error) {
      console.log(error);
    }
  }

  documentsDataSource: any;
  documents = async (): Promise<void> => {
    try {
      let number: number = 0;
      (this.isDocuPending === "pending") ? number = 0 : number = 1;
      const response = await this.paymentService.sendDashboardRequest(`${this.isDocuPending}/transaction/${number}`, null);
      this.documentsDataSource = new MatTableDataSource(response.payload);
    } catch (error) {
      console.log(error);
    }
  }

  ordersDataSource: any;
  orders = async (): Promise<void> => {
    try {
      let number: number = 0;
      (this.isOrderPending === "pending") ? number = 0 : number = 1;
      const response = await this.paymentService.sendDashboardRequest(`${this.isOrderPending}/order/${number}`, null);
      this.ordersDataSource = new MatTableDataSource(response.payload);
    } catch (error) {
      console.log(error);
    }
  }

  removeRecord = async (id: number, method: string): Promise<void> => {
    const warning = await Swal.fire({
                  title:'Archive',
                  text:`Are you sure you want to archive this payment?`,
                  icon:'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3B8BEB',
                  cancelButtonColor: '#DD2C00',
                  confirmButtonText:'Archive'
                });
    if (warning.isConfirmed) {
      try {
        const data: any = {};
        data.pt_isDeleted = 1;
        const response = await this.paymentService.sendDashboardRequest(`updatePayment/${id}/${method}`, data);
        if (response.status.remarks == "success") {
          await Swal.fire('Success!', 'Payment is archived', 'success');
          this.ngOnInit();
        }
      } catch(error) {
        await Swal.fire('Oops...', 'Something went wrong', 'error');
      }
    }
  }

  payData = async (id: number): Promise<void> => {
    try {
      let data: any = {};
        data.pt_isPayed = 1;
      const response = await this.paymentService.sendDashboardRequest("updatePayment/" + id +  "/checkup", data);
      if (response.status.remarks == "success") {
        await Swal.fire('Success!', 'New payment has been recorded', 'success');
        this.ngOnInit();
      }
    } catch(error) {
      console.log(error);
    }
  }   

  viewRecord(id: number, method: string){
    this.dialog.open(PaymentViewComponent, { data: {'id': id, 'method': method}});
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

  CheckOutProject(){
    this.dialog.open(PendingPaymentComponent, { data: {"name": "Christian"} });
  }

  UpdateProject(){
    this.dialog.open(PaymentUpdateComponent);
  }

  name: string;
  date: string;
  amount: number;
  receive: number;
  change: number;
  printdata: any;
  
      //Checkup
      printReceiptC(i): void {
      this.paymentService.sendAPIRequest(`payments/checkup/` + i, null).subscribe(data => {
        this.printdata = data.payload[0];
        this.name = this.printdata.res_lname+', '+this.printdata.res_fname;
        this.date = this.printdata.pt_date;
        this.amount = this.printdata.fld_amount;
        this.receive = this.printdata.pt_money_recieved;
        this.change = this.amount - this.receive;
        console.log(this.name);  

        var docDefinition = {
          info: {
            title: 'Receipt For '+this.name+' ',
          },
          content: [
          {
            text: 'Republic of the Philippines',
            fontSize: 15,
            alignment: 'center',
            bold: true,
            margin: [0, 3,0, 3],
          },
          {
            text: 'CITY OF OLONGAPO',
            fontSize: 15,
            bold: true,
            alignment: 'center',
            margin: [0, 3,0, 3]   
          },
          {
            text: 'Barangay Management System',
            fontSize: 15,
            bold: true,
            alignment: 'center',
            margin: [0, 10, 0, 10]   
          },
          {
            text: 'OFFICE OF THE LUPONG TAGAMAPAYAPA',
            fontSize: 20,
            bold: true,
            alignment: 'center',
            margin: [0, 10, 0, 10]   
          },
          {
            text: 'Official Receipt',
            style: 'sectionHeader'
          },
          {
            columns: [
              [
                { 
                  text: this.name,
                  style: 'details1' 
                },
                { 
                  text: 'Payment For: Checkup',
                  style: 'details1'
                },
                { 
                  text: 'Payment Fee: Php '+this.amount+'.00',
                  style: 'details1'
                },
                { 
                  text: 'Cash: Php '+this.receive+'.00',
                  style: 'details1'
                },
                { 
                  text: 'Change: Php '+this.change+'.00',
                  style: 'details1'
                }
              ],
              [
                {
                  text: 'Date: '+this.date,
                  alignment: 'right' ,
                  style: 'details1'
                }
                // ,
                // { 
                //   text: `Bill No : ${((Math.random() *1000).toFixed(0))}`,
                //   alignment: 'right' ,
                //   style: 'details1'
                // }
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
          }
        ],
        styles: {
          sectionHeader: {
            bold: true,
            fontSize: 18,
            margin: [0, 70,0, 20]          
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
      })
  }

  //Document
  printReceiptD(i): void {
    this.paymentService.sendAPIRequest(`payments/checkup/` + i, null).subscribe(data => {
      this.printdata = data.payload[0];
      this.name = this.printdata.res_lname+', '+this.printdata.res_fname;
      this.date = this.printdata.pt_date;
      this.amount = this.printdata.fld_amount;
      this.receive = this.printdata.pt_money_recieved;
      this.change = this.amount - this.receive;
      console.log(this.name);  

      var docDefinition = {
        info: {
          title: 'Receipt For '+this.name+' ',
        },
        content: [
        {
          text: 'Republic of the Philippines',
          fontSize: 15,
          alignment: 'center',
          bold: true,
          margin: [0, 3,0, 3],
        },
        {
          text: 'CITY OF OLONGAPO',
          fontSize: 15,
          bold: true,
          alignment: 'center',
          margin: [0, 3,0, 3]   
        },
        {
          text: 'Barangay Management System',
          fontSize: 15,
          bold: true,
          alignment: 'center',
          margin: [0, 10, 0, 10]   
        },
        {
          text: 'OFFICE OF THE LUPONG TAGAMAPAYAPA',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          margin: [0, 10, 0, 10]   
        },
        {
          text: 'Official Receipt',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              { 
                text: this.name,
                style: 'details1' 
              },
              { 
                text: 'Payment For: Checkup',
                style: 'details1'
              },
              { 
                text: 'Payment Fee: Php '+this.amount+'.00',
                style: 'details1'
              },
              { 
                text: 'Cash: Php '+this.receive+'.00',
                style: 'details1'
              },
              { 
                text: 'Change: Php '+this.change+'.00',
                style: 'details1'
              }
            ],
            [
              {
                text: 'Date: '+this.date,
                alignment: 'right' ,
                style: 'details1'
              }
              // ,
              // { 
              //   text: `Bill No : ${((Math.random() *1000).toFixed(0))}`,
              //   alignment: 'right' ,
              //   style: 'details1'
              // }
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
        }
      ],
      styles: {
        sectionHeader: {
          bold: true,
          fontSize: 18,
          margin: [0, 70,0, 20]          
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
      })
  }

  //Order
  printReceiptO(i): void {
    this.paymentService.sendAPIRequest(`payments/checkup/` + i, null).subscribe(data => {
      this.printdata = data.payload[0];
      this.name = this.printdata.res_lname+', '+this.printdata.res_fname;
      this.date = this.printdata.pt_date;
      this.amount = this.printdata.fld_amount;
      this.receive = this.printdata.pt_money_recieved;
      this.change = this.amount - this.receive;
      console.log(this.name);  

      var docDefinition = {
        info: {
          title: 'Receipt For '+this.name+' ',
        },
        content: [
        {
          text: 'Republic of the Philippines',
          fontSize: 15,
          alignment: 'center',
          bold: true,
          margin: [0, 3,0, 3],
        },
        {
          text: 'CITY OF OLONGAPO',
          fontSize: 15,
          bold: true,
          alignment: 'center',
          margin: [0, 3,0, 3]   
        },
        {
          text: 'Barangay Management System',
          fontSize: 15,
          bold: true,
          alignment: 'center',
          margin: [0, 10, 0, 10]   
        },
        {
          text: 'OFFICE OF THE LUPONG TAGAMAPAYAPA',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          margin: [0, 10, 0, 10]   
        },
        {
          text: 'Official Receipt',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              { 
                text: this.name,
                style: 'details1' 
              },
              { 
                text: 'Payment For: Checkup',
                style: 'details1'
              },
              { 
                text: 'Payment Fee: Php '+this.amount+'.00',
                style: 'details1'
              },
              { 
                text: 'Cash: Php '+this.receive+'.00',
                style: 'details1'
              },
              { 
                text: 'Change: Php '+this.change+'.00',
                style: 'details1'
              }
            ],
            [
              {
                text: 'Date: '+this.date,
                alignment: 'right' ,
                style: 'details1'
              }
              // ,
              // { 
              //   text: `Bill No : ${((Math.random() *1000).toFixed(0))}`,
              //   alignment: 'right' ,
              //   style: 'details1'
              // }
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
        }
      ],
      styles: {
        sectionHeader: {
          bold: true,
          fontSize: 18,
          margin: [0, 70,0, 20]          
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
      })
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

 
  
