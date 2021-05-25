import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  baseURL = 'http://localhost/barangay-payment-system/barangay-payment-api/';
  // baseURL = 'https://sia-barangay-management-system.000webhostapp.com/pamyent-api/';
  loginState: boolean = false;
  SharedData: number;
  loggedIn: any;
  constructor(private http: HttpClient, private router: Router) { }

  sendAPIRequest(method, data) {
    return <any>(
      this.http.post(this.baseURL + btoa(method), btoa(JSON.stringify(data)))
    );
  }

  
  public sendDashboardRequest = async (endpoint, data): Promise<any> => {
  	const response: any = await this.http.post(this.baseURL + btoa(endpoint), btoa(JSON.stringify(data))).toPromise();
  	return response;
  }

  login(method, data) {
    return <any>(
      this.http.post(this.baseURL + btoa(method), btoa(JSON.stringify(data)))
    );
  }

  logoutUser() {
    localStorage.removeItem(btoa("username"))
    localStorage.removeItem(btoa("role"))
    localStorage.removeItem(btoa("loginState"))
    localStorage.removeItem(btoa("token"))
    this.router.navigateByUrl("login")
  }

  isLoggedIn(): boolean {
    let log = window.sessionStorage.getItem('loginState');
    return (log==='true'?true:false);
  }

  setLogin(): void {
    window.sessionStorage.setItem('loginState', 'true');
  }

  setLogout(): void {
    window.sessionStorage.clear();
    this.loginState = false;
  }

}