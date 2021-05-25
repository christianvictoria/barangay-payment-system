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

  hide = true;

  constructor(private ds:PaymentsService, private router:Router) { }

  ngOnInit(): void {
  }

  loginData: any = {}
  iUser: any;
  iPass: any;
  a: any = {};

  login() {
    this.loginData.username = this.iUser;
    this.loginData.password = this.iPass;
    this.ds.sendAPIRequest("login/", this.loginData).subscribe((data: any) => {
      this.a = data.payload;  
      window.sessionStorage.setItem('id', this.a.id);
      window.sessionStorage.setItem('username', this.a.username);
      window.sessionStorage.setItem('test', this.a.role);
      if(this.a.subsystem != 'payment') {
        Swal.fire({
          title: 'Please use the credentials for Payment System!',
          icon: 'error',
        confirmButtonText: "Confirm",
        });
      } else {
        if(this.a.role == 'administrator') {
          this.ds.setLogin();
          Swal.fire({
            title: 'Welcome Administrator!',
            icon: 'success',
          confirmButtonText: "Confirm",
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
              this.router.navigate(['/dashboard']);
              
            }
          });
        } else {
          this.ds.setLogin();
          Swal.fire({
            title: 'Welcome Staff!',
            icon: 'success',
          confirmButtonText: "Confirm",
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
              this.router.navigate(['/dashboard']);
            }
          });
        }
      }
      
    }, (err: any) => {
      console.log(err.error.status.message)
      if(err.error.status.message == 'Incorrect Password') {
        Swal.fire({
          title: 'Incorrect Password. Please try again.',
          icon: 'error',
          confirmButtonText: "Confirm",
        });
      }
      
      if(err.error.status.message == 'User does not exist') {
        Swal.fire({
          title: 'There is no such User!',
          icon: 'error',
          confirmButtonText: "Confirm",
        });
      }
    }
    );
  }

}