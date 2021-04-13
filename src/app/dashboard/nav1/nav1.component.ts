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
    this.dialog.open(PendingPaymentComponent, { data: {"name": "Christian"} });
  }

  UpdateProject(){
    this.dialog.open(PaymentUpdateComponent);
  }

  Confirmation() {
      Swal.fire({
        title:'Are you sure?',
        text:`You won't be able to revert this!`,
        icon:'warning',
        showCancelButton: true,
        confirmButtonColor: '#dd2c00',
        cancelButtonColor: '',
        confirmButtonText:'Confirm'
      }).then(result => {
        if (result.value){
          console.log('Delete');
          Swal.fire('Successfully', 'Deleted', 'success');
        } 
        else if (result.isDenied) {
          Swal.fire('Oops...', 'Something went wrong', 'error');
        }
      })
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

  const ELEMENT_DATA: PaymentDashboard[] = [
    {no: 1, name: 'John Ezekiel', daterecorded: '02/21/2021', paymentfor: 'Barangay Clearance', paymentreceive: 25.00, purpose: 'School Purpose'},
    {no: 2, name: 'Tracey Solis', daterecorded: '02/25/2021', paymentfor: 'Cedula', paymentreceive: 25.00, purpose: 'Work Purpose'},
    {no: 3, name: 'Jim Caeasar', daterecorded: '02/25/2021', paymentfor: 'Barangay Clearance', paymentreceive: 25.00, purpose: 'Loan Purpose'},
    {no: 4, name: 'Juan Dela Cruz', daterecorded: '02/25/2021', paymentfor: 'Barangay Clearance', paymentreceive: 25.00, purpose: 'Travel Purpose'}
  ];
  
