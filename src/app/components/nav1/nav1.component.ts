import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';

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
import { Subscription } from 'rxjs';

import Swal from 'sweetalert2';
import { CheckoutPaymentComponent } from '../checkout-payment/checkout-payment.component';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';

@Component({
  selector: 'app-nav1',
  templateUrl: './nav1.component.html',
  styleUrls: ['./nav1.component.css']
})
export class Nav1Component implements OnInit {

  message: any;
  private subs: Subscription;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private paymentService: PaymentsService, public dialog: MatDialog, public router: Router, private dashboardService: DashboardService) { 
    this.subs = this.dashboardService.getUpdate().subscribe(message => {
      this.message = message;
      this.ngOnInit();
    });
  }
  
  
  displayedColumns: string[] = ['print', 'pt_id', 'residents', 'for','amount', 'money recieved', 'date', 'actions'];
  displayedColumns2: string[] = ['print', 'pt_id', 'name', 'for','quantity', 'amount', 'money recieved', 'date', 'actions'];
  displayedColumns3: string[] = ['print', 'pt_id', 'medicine', 'quantity', 'amount', 'money recieved', 'date', 'actions'];
  isSidebarOpen=true;
  isVisible = true; // whenever you need to hide an element

  ngOnInit() {
    this.checkups();
    this.documents();
    this.orders();
    
    if(sessionStorage.getItem(("test")) == null){
      this.router.navigate(["/"])
    }

    if(atob(localStorage.getItem(btoa("role"))) == "staff"){
      this.isVisible = true;
    }else{
      this.isVisible = false;
    }
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
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
      this.checkupsDataSource.paginator = this.paginator; 
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
      this.documentsDataSource.paginator = this.paginator; 
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
      this.documentsDataSource.paginator = this.paginator; 
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
    this.dialog.open(PaymentViewComponent, { data: {'id': id, 'method': method, 'archived': ''}});
  }

  checkOutPayment(id: number, method: string){
    this.dialog.open(CheckoutPaymentComponent, { data: {'id': id, 'method': method } });
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
  openNav2(){
    this.router.navigate(["/nav2"]);
  }
  openArchive(){
    this.router.navigate(["/archive"]);
  }

  UpdateProject(){
    this.dialog.open(PaymentUpdateComponent);
  }

  name: string;
  date: string;
  expenseFor: string;
  paymentFor: string;
  amount: number;
  receive: any;
  printdata: any;
  printdata2: any;
  printdata3: any;
  
     
  //Checkup
    printReceiptCheckup = async (id: number, method: string): Promise<void> => {
      const response = await this.dashboardService.sendDashboardRequest(`payments/${method}/${id}`, null);
      console.log(response.payload[0]);
      this.printdata3 = response.payload[0];
      this.name = this.printdata3.res_lname+', '+this.printdata3.res_fname;
      this.date = this.printdata3.pt_date;
      this.amount = this.printdata3.fld_amount;
      this.receive = this.printdata3.pt_money_recieved;

      const docDefinition3 = {
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

    pdfMake.createPdf(docDefinition3).open();
  }

     //Documents
      printReceiptDocu = async (id: number, method: string): Promise<void> => {
        const response = await this.dashboardService.sendDashboardRequest(`payments/${method}/${id}`, null);
        this.printdata2 = response.payload[0];
        this.paymentFor = this.printdata2.docu_type;
        this.name = this.printdata2.res_lname+', '+this.printdata2.res_fname;
        this.date = this.printdata2.pt_date;
        this.amount = this.printdata2.docu_prc;
        this.receive = this.printdata2.pt_money_recieved;

        const docDefinition2 = {
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
                  text: 'Payment For: '+this.paymentFor,
                  style: 'details1'
                },
                { 
                  text: 'Payment Fee: Php '+this.amount+'.00',
                  style: 'details1'
                },
                { 
                  text: 'Cash: Php '+this.receive+'.00',
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

    pdfMake.createPdf(docDefinition2).open();
  }

   //Orders
   printReceiptOrders = async (id: number, method: string): Promise<void> => {
    const response = await this.dashboardService.sendDashboardRequest(`payments/${method}/${id}`, null);
    this.printdata = response.payload[0];
    this.name = this.printdata.med_name;
    this.date = this.printdata.pt_date;
    this.amount = this.printdata.fld_totalAmount;
    this.receive = this.printdata.pt_money_recieved;

    const docDefinition = {
      info: {
        title: 'Receipt For '+this.name+' '+this.date,
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
              text: 'Payment For: '+this.name,
              style: 'details1'
            },
            { 
              text: 'Total Amount: Php '+this.amount+'.00',
              style: 'details1'
            },
            { 
              text: 'Payment Received: Php '+this.receive+'.00',
              style: 'details1'
            }
          ],
          [
            {
              text: 'Date: '+this.date,
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

 
  
