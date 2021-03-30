import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav3',
  templateUrl: './nav3.component.html',
  styleUrls: ['./nav3.component.css']
})
export class Nav3Component implements OnInit {

  constructor( public router: Router ) { }

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
  openNav2(){
    this.router.navigate(["/nav2"]);
  }
  openNav4(){
    this.router.navigate(["/nav4"]);
  }
  logout(){
    this.router.navigate(["/"]);
  }

}
