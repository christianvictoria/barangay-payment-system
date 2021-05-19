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

import { Subscription } from 'rxjs';

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

  displayedColumns: string[] = ['print', 'Expense No.', 'Given To', 'For', 'Budget Fee', 'Date', 'actions'];
  dataSource: any;
  expenses: any[] = [];
  message: any;
  isSidebarOpen=true;
  private subs: Subscription;
  
  constructor(
    public dialog: MatDialog, 
    public router: Router,
    private dashboardService: DashboardService
  ) {   
    this.subs = this.dashboardService.getUpdate().subscribe(message => {
      this.message = message;
      this.ngOnInit();
    });
  }
  ngOnInit(): void {
    this.getExpenses();
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  getExpenses = async (): Promise<void> => {
    try {
      const response = await this.dashboardService.sendDashboardRequest(`expenses/`, null);
      this.expenses = response.payload;
      this.dataSource = new MatTableDataSource<ExpensesData>(this.expenses);
    } catch(error) {
      console.log(error);
    }
  }
  addExpensesModal = () => {
    this.dialog.open(ExpenseAddComponent);
  }
  viewExpenses = (id: number): void => {
    this.dialog.open(ExpenseViewComponent, { data: id });
  }
  updateExpense = (id: number): void => {
    this.dialog.open(ExpenseUpdateComponent, { data: id });
  }
  removeRecord = async (id: number): Promise<void> => {
     const warning = await Swal.fire({
                    title:'Archive',
                    text:`Are you sure you want to archive this expense?`,
                    icon:'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3B8BEB',
                    cancelButtonColor: '#DD2C00',
                    confirmButtonText:'Archive'
                  });
    if (warning.isConfirmed) {
      await Swal.fire('Success!', 'Expense is archived', 'success');
      try {
        const data: any = {};
        data.exp_isDeleted = 1;
        const response = await this.dashboardService.sendDashboardRequest(`updateExpenses/${id}`, data);
        if (response.status.remarks == "success") this.getExpenses();
      } catch(error) {
        await Swal.fire('Oops...', 'Something went wrong', 'error');
      }
    }
  }
  searchInput: string;
  filterExpenses = async (): Promise<void> => {
    const response = await this.dashboardService.sendDashboardRequest(`filterExpenses/${this.searchInput}`, null);
    if (response.status.remarks == "success") {
      this.expenses = response.payload;
      this.dataSource = new MatTableDataSource<ExpensesData>(this.expenses);
    } else {
       alert("Something Went Wrong");
    }
  }
  openSidebar() {
    this.isSidebarOpen = true;
  }
  closeSidebar() {
    this.isSidebarOpen = false;
  }
  openDashboard(){
    this.router.navigate(["/dashboard"]);
  }
  openNav1(){
    this.router.navigate(["/nav1"]);
  }
  openPendingTrans(){
    this.router.navigate(["/PendingTransactions"]);
  }
  logout(){
    this.router.navigate(["/"]);
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

export interface ExpensesData {
  exp_id: number;
  exp_lname: string;
  exp_fname: string;
  exp_mname: string;
  exp_for: string;
  exp_desc: string;
  exp_money_release: string;
  exp_isDeleted: number;
  exp_date: any;
}

