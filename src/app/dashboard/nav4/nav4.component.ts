import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav4',
  templateUrl: './nav4.component.html',
  styleUrls: ['./nav4.component.css']
})
export class Nav4Component implements OnInit {

  constructor(public router : Router) { }

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
  openNav1(){
    this.router.navigate(["/nav1"]);
  }
  openNav2(){
    this.router.navigate(["/nav2"]);
  }
  openNav3(){
    this.router.navigate(["/nav3"]);
  }
  openDashboard(){
    this.router.navigate(["/dashboard"]);
  }

}
