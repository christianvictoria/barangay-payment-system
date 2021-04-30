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
  orders: any = "";
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
    this.getCheckUpPayments()
    this.getDocumentPayments()
    this.getPendingPayments()
    this.getExpenses()
    this.getOrderPayments()
  }

  
  getOrderPayments = async (): Promise<void> => {
    try {
      const samplePaymentMethod: string = "order";
      const response = await this.dashboardService.sendDashboardRequest(`payments/${samplePaymentMethod}`, null);
      (response.payload.length < 1) ? this.orders = "0" : this.orders = response.payload.length;
    } catch(error) {
      console.log(error);
    }
  }

  getCheckUpPayments = async (): Promise<void> => {
    try {
      const samplePaymentMethod: string = "checkup";
      const response = await this.dashboardService.sendDashboardRequest(`paid/${samplePaymentMethod}/1`, null);
      (response.payload.length < 1) ? this.checkups = "0" : this.checkups = response.payload.length;
    } catch(error) {
      console.log(error);
    }
  }

  getDocumentPayments = async (): Promise<void> => {
    try {
      const samplePaymentMethod: string = "transaction";
      const response = await this.dashboardService.sendDashboardRequest(`paid/${samplePaymentMethod}/1`, null);
      (response.payload.length < 1) ? this.documents = "0" : this.documents = response.payload.length;
    } catch(error) {
      console.log(error);
    }
  }  

  getPendingPayments = async (): Promise<void> => {
    try {
      const samplePaymentIsDeleted: number = 0;
      const response = await this.dashboardService.sendDashboardRequest(`pending/${samplePaymentIsDeleted}`, null);
      this.pending = response.payload.length;
    } catch(error) {
      console.log(error);
    }
  }

  getExpenses = async (): Promise<void> => {
    try {
      const response = await this.dashboardService.sendDashboardRequest(`expenses/`, null);
      this.expenses = response.payload.length;
    } catch(error) {
      console.log(error);
    }
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
    openPendingTrans(){
      this.router.navigate(["/PendingTransactions"]);
    }
}


