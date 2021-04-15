import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
baseURL: string = "http://localhost/barangay-payment-system/barangay-payment-api/";
SharedData: number;
  constructor(private http: HttpClient) { }

  sendAPIRequest(method, data) {
    return <any>(
      this.http.post(this.baseURL + btoa(method), btoa(JSON.stringify(data)))
    );
  }
  
  public sendDashboardRequest = async (endpoint, data): Promise<any> => {
  	const response: any = await this.http.post(this.baseURL + btoa(endpoint), btoa(JSON.stringify(data))).toPromise();
  	return response;
  }

}

