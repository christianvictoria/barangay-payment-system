import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs'

import { ExpenseViewComponent } from '../expense-view/expense-view.component';
import { ExpenseAddComponent } from '../expense-add/expense-add.component';
import { ExpenseUpdateComponent } from '../expense-update/expense-update.component';
import { PendingExpenseComponent } from '../pending-expense/pending-expense.component';

// Service
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';

import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav2',
  templateUrl: './nav2.component.html',
  styleUrls: ['./nav2.component.css']
})
export class Nav2Component implements OnInit {

  expenses: any[] = [];
  constructor(
    public dialog: MatDialog, 
    public router: Router,
    private dashboardService: DashboardService
  ) { }

  isSidebarOpen=true;

  openSidebar() {
    this.isSidebarOpen = true;
  }
  closeSidebar() {
    this.isSidebarOpen = false;
  }

  ngOnInit(): void {
    setInterval(() => this.getExpenses(), 3000);
  }

  getExpenses = async (): Promise<void> => {
    const sampleExpensesIsDeleted: number = 0;
    const response = await this.dashboardService.sendDashboardRequest(`expenses/${sampleExpensesIsDeleted}`, null);
    this.expenses = response.payload;
    console.log(this.expenses);
  }
  

  AddProject(){
    this.dialog.open(ExpenseAddComponent);
  }

  CheckOutProject(endpoint){
    this.dialog.open(PendingExpenseComponent, { data: endpoint });
  }

  ViewProject(data){
    this.dialog.open(ExpenseViewComponent, { data: data });
  }

  UpdateProject(){
    this.dialog.open(ExpenseUpdateComponent);
  } 

  DeleteProject(id){
    this.dialog.open(ExpenseUpdateComponent);
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

  openDashboard(){
    this.router.navigate(["/dashboard"]);
  }
  openNav1(){
    this.router.navigate(["/nav1"]);
  }
  openNav3(){
    this.router.navigate(["/nav3"]);
  }
  openNav4(){
    this.router.navigate(["/nav4"]);
  }
  logout(){
    this.router.navigate(["/"]);
  }

  
  generatePDF(){
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
              text: 'Christian Alip',
              style: 'details1' 
            },
            { 
              text: '091234567890',
              style: 'details1' 
            },
            { 
              text: '13 Gabaya Street Barangay Barretto' ,
              style: 'details1'
            },
            { 
              text: 'Expense For: Clean Up Drive' ,
              style: 'details1'
            },
            { 
              text: 'Budget Fee: Php 15,000.00' ,
              style: 'details1'
            },
            { 
              text: 'Tax: Php 0.00' ,
              style: 'details1'
            },
            { 
              text: 'Cash: Php 20,000.00' ,
              style: 'details1'
            },
            { 
              text: 'Change: Php 5,000.00' ,
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

