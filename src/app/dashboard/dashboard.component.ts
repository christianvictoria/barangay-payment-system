import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

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


