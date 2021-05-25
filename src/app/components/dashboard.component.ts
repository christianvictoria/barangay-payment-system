import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, Event as NavigationEvent } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

// Service
import { DashboardService } from '../services/dashboard/dashboard.service';
import { PaymentsService } from 'src/app/payments.service';

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
  jan: any = 0;
  feb: any = 0;
  mar: any = 0;
  apr: any = 0;
  may: any = 0;
  jun: any = 0;
  jul: any = 0;
  aug: any = 0;
  sep: any = 0;
  oct: any = 0;
  nov: any = 0;
  dec: any = 0;
  constructor(
    public dialog: MatDialog, 
    public router: Router, 
    private dashboardService: DashboardService,
    private paymentService: PaymentsService
  ) {
  }
  isVisible = true;
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
    this.getOrderPayments()
    this.getExpenses()
    this.getDates()
   
    
    if(sessionStorage.getItem(("test")) == null){
      this.router.navigate(["/"])
    }

    if(atob(localStorage.getItem(btoa("role"))) == "staff"){
      this.isVisible = true;
    }else{
      this.isVisible = false;
    }
    

    
  }
  getDates(){
    this.getJan()
    this.getFeb()
    this.getMar()
    this.getApr()
    this.getMay()
    this.getJun()
    this.getJul()
    this.getAug()
    this.getSep()
    this.getOct()
    this.getNov()
    this.getDec()
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
      (response.payload.length < 1) ? this.pending = "0" : this.pending = response.payload.length;
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

 getJan = async (): Promise<void> => {
    try {
      var currentTime = new Date()
      var year = currentTime.getFullYear()
      const response = await this.dashboardService.sendDashboardRequest(`jan/`, null);
      localStorage.setItem("jan", response.payload.length);
     
    } catch(error) {
      console.log(error);
    }
  }
  getFeb = async (): Promise<void> => {
    try {
      var currentTime = new Date()
      var year = currentTime.getFullYear()
      const response = await this.dashboardService.sendDashboardRequest(`feb/`, null);
      localStorage.setItem("feb", response.payload.length);
     
    } catch(error) {
      console.log(error);
    }
  }
  getMar = async (): Promise<void> => {
    try {
      var currentTime = new Date()
      var year = currentTime.getFullYear()
      const response = await this.dashboardService.sendDashboardRequest(`mar/`, null);
      localStorage.setItem("mar", response.payload.length);

    } catch(error) {
      console.log(error);
    }
  }
  getApr = async (): Promise<void> => {
    try {
      var currentTime = new Date()
      var year = currentTime.getFullYear()
      const response = await this.dashboardService.sendDashboardRequest(`apr/`, null);
      localStorage.setItem("apr", response.payload.length);
      
    } catch(error) {
      console.log(error);
    }
  }
  getMay = async (): Promise<void> => {
    try {
      var currentTime = new Date()
      var year = currentTime.getFullYear()
      const response = await this.dashboardService.sendDashboardRequest(`may/`, null);
      localStorage.setItem("may", response.payload.length);
    
    } catch(error) {
      console.log(error);
    }
  }
  getJun = async (): Promise<void> => {
    try {
      var currentTime = new Date()
      var year = currentTime.getFullYear()
      const response = await this.dashboardService.sendDashboardRequest(`jun/`, null);
      localStorage.setItem("jun", response.payload.length);
     
    } catch(error) {
      console.log(error);
    }
  }
  getJul = async (): Promise<void> => {
    try {
      var currentTime = new Date()
      var year = currentTime.getFullYear()
      const response = await this.dashboardService.sendDashboardRequest(`jul/`, null);
      localStorage.setItem("jul", response.payload.length);
    
    } catch(error) {
      console.log(error);
    }
  }
  getAug = async (): Promise<void> => {
    try {
      var currentTime = new Date()
      var year = currentTime.getFullYear()
      const response = await this.dashboardService.sendDashboardRequest(`aug/`, null);
      localStorage.setItem("aug", response.payload.length);
     
    } catch(error) {
      console.log(error);
    }
  }
  getSep = async (): Promise<void> => {
    try {
      var currentTime = new Date()
      var year = currentTime.getFullYear()
      const response = await this.dashboardService.sendDashboardRequest(`sep/`, null);
      localStorage.setItem("sep", response.payload.length);
  
    } catch(error) {
      console.log(error);
    }
  }
  getOct = async (): Promise<void> => {
    try {
      var currentTime = new Date()
      var year = currentTime.getFullYear()
      const response = await this.dashboardService.sendDashboardRequest(`oct/`, null);
      localStorage.setItem("oct", response.payload.length);
   
    } catch(error) {
      console.log(error);
    }
  }
  getNov = async (): Promise<void> => {
    try {
      var currentTime = new Date()
      var year = currentTime.getFullYear()
      const response = await this.dashboardService.sendDashboardRequest(`nov/`, null);
      localStorage.setItem("nov", response.payload.length);
    
    } catch(error) {
      console.log(error);
    }
  }
  getDec = async (): Promise<void> => {
    try {
      var currentTime = new Date()
      var year = currentTime.getFullYear()
      const response = await this.dashboardService.sendDashboardRequest(`dec/`, null);
      localStorage.setItem("dec", response.payload.length);
   
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
    public barChartData = [{ data: [localStorage.getItem("jan"), localStorage.getItem("feb"), localStorage.getItem("mar"), localStorage.getItem("apr"), localStorage.getItem("may"), localStorage.getItem("jun"), localStorage.getItem("jul"), localStorage.getItem("aug"), localStorage.getItem("sep"), localStorage.getItem("oct"), localStorage.getItem("nov"), localStorage.getItem("dec")], backgroundColor: '#3B8BEB', label: 'Monthly Report'}  
    ];
    
    logout(){
      sessionStorage.removeItem("test");
      this.router.navigate(["/"]);
    }
    openNav1(){
      this.router.navigate(["/nav1"]);
    }
    openNav2(){
      this.router.navigate(["/nav2"]);
    }
    openArchive(){
      this.router.navigate(["/archive"]);
    }

}


