import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public route : Router) { }

  ngOnInit(): void {
  }

  login(){
    this.route.navigate(['/dashboard']);
  }

}
