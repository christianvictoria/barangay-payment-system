import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  BASE_URL = 'http://localhost/barangay-payment/barangay-payment-api/';
  constructor(private http: HttpClient) { }

  public sendDashboardRequest = async (endpoint, data): Promise<any> => {
  	const response: any = await this.http.post(this.BASE_URL + btoa(endpoint), btoa(JSON.stringify(data))).toPromise();
  	return response;
  }
}
