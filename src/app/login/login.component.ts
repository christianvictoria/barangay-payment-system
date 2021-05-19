import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: 'Welcome!',
      icon: 'success',
    confirmButtonText: "Confirm",
    }).then((result) => {
        if (result.isConfirmed) {
        this.route.navigate(['/feedback-list']);
      }
    });
  }

  signin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required ]),
    password: new FormControl('', [Validators.required, Validators.min(3) ])
  });
  hide = true;
  get emailInput() { return this.signin.get('email'); }
  get passwordInput() { return this.signin.get('password'); }  

}
