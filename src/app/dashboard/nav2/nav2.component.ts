import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ExpenseViewComponent } from '../expense-view/expense-view.component';
import { ExpenseAddComponent } from '../expense-add/expense-add.component';

@Component({
  selector: 'app-nav2',
  templateUrl: './nav2.component.html',
  styleUrls: ['./nav2.component.css']
})
export class Nav2Component implements OnInit {

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
  
  displayedColumns: string[] = ['no', 'name', 'daterecorded', 'paymentfor', 'paymentreceive', 'purpose','actions'];
  dataSource = new MatTableDataSource<PaymentDashboard>(ELEMENT_DATA);

  AddProject(){
    this.dialog.open(ExpenseAddComponent);
  }

  ViewProject(){
    this.dialog.open(ExpenseViewComponent);
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
    {no: 1, name: 'John Ezekiel', daterecorded: '02/21/2021', paymentfor: 'Feeding Program', paymentreceive: 20000.00, purpose: 'For Children'},
    {no: 2, name: 'Tracey Solis', daterecorded: '02/28/2021', paymentfor: 'Feeding Program', paymentreceive: 20000.00, purpose: 'For Children'},
    {no: 3, name: 'Jim Caeasar', daterecorded: '03/01/2021', paymentfor: 'Feeding Program', paymentreceive: 20000.00, purpose: 'For Children'},
    {no: 3, name: 'Juan Dela Cruz', daterecorded: '06/23/2021', paymentfor: 'Feeding Program', paymentreceive: 20000.00, purpose: 'For Children'}
  ];
  
