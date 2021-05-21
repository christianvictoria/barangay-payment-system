import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { PaymentsService } from '../payments.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usernameInput: string = ""
  passwordInput: string = ""

  constructor(public router: Router, private auth: PaymentsService) { }

  ngOnInit(): void {
  }

  login() {
    if (this.usernameInput == "" && this.passwordInput == "") {
      Swal.fire({
        icon: 'question',
        title: 'Invalid',
        text: 'Please enter your username or password'
      })
    } else {
      this.auth.login("login/", { fld_username: this.usernameInput, fld_password: this.passwordInput }).subscribe(res => {
        console.log(res)
        if (res.status.remarks == "Incorrect Subsystem") {
          Swal.fire({
            icon: 'error',
            title: 'Incorrect Subsystem Credentials...',
            text: 'Please login using the payment subsystem credentials',
          })
        }
        if (res.status.remarks == "failed") {
          Swal.fire({
            icon: 'error',
            title: 'Incorrect Credentials...',
            text: 'Please check your username or password and try again',
          })
        }
        if (res.status.remarks == "success") {
          localStorage.setItem(btoa("username"), btoa(res.payload.fld_username))
          localStorage.setItem(btoa("loginState"), btoa('true'))
          localStorage.setItem(btoa("role"), btoa(res.payload.fld_role))
          localStorage.setItem(btoa("token"), btoa(res.token))
          window.sessionStorage.setItem('test', btoa(res.payload.fld_role));
          this.router.navigate(['/dashboard']);
        }
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! Please try again later or contact your systems administrator',
        })
      })
    }


     
  }


}