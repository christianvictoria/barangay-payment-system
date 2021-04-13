import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

// Service
import { DashboardService } from '../services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  checkups: any = "";
  documents: any = "";
  expenses: any = "";
  pending: any = "";
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
    setInterval(() => this.getCheckUpPayments(), 5000);
    setInterval(() => this.getDocumentPayments(), 5000);
    setInterval(() => this.getPendingPayments(), 5000);
    setInterval(() => this.getExpenses(), 5000);
  }



  getCheckUpPayments = async (): Promise<void> => {
    const samplePaymentMethod: string = "checkup";
    const samplePaymentIsDeleted: number = 0;
    const response = await this.dashboardService.sendDashboardRequest(`payments/${samplePaymentMethod}/${samplePaymentIsDeleted}`, null);
    this.checkups = response.payload.length;
  }

  getDocumentPayments = async (): Promise<void> => {
    const samplePaymentMethod: string = "transaction";
    const samplePaymentIsDeleted: number = 0;
    const response = await this.dashboardService.sendDashboardRequest(`payments/${samplePaymentMethod}/${samplePaymentIsDeleted}`, null);
    this.documents = response.payload.length;
  }  

  getPendingPayments = async (): Promise<void> => {
    const samplePaymentIsDeleted: string = "1";
    const response = await this.dashboardService.sendDashboardRequest(`payments/${samplePaymentIsDeleted}`, null);
    this.pending = response.payload.length;
    console.log(this.pending);
  }

  getExpenses = async (): Promise<void> => {
    const sampleExpensesIsDeleted: number = 0;
    const response = await this.dashboardService.sendDashboardRequest(`expenses/${sampleExpensesIsDeleted}`, null);
    this.expenses = response.payload.length;
  }

    public barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true
    };
    public barChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    public barChartType = 'bar';
    public barChartLegend = true;
    public barChartData = [{ data: [2800, 4800, 4000, 1900, 8600, 2700, 9000, 4000, 1900, 8600, 2700, 9000], backgroundColor: '#3B8BEB', label: 'Monthly Report'}  
    ];
  
    logout(){
      this.router.navigate(["/"]);
    }
    openNav1(){
      this.router.navigate(["/nav1"]);
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
    
}


