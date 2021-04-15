import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
baseURL: string = "http://localhost/barangay-payment-api/";
SharedData: number;
  constructor(private http: HttpClient) { }

  sendAPIRequest(method, data) {
    return <any>(
      this.http.post(this.baseURL + btoa(method) + btoa("checkup/"), btoa(JSON.stringify(data)))
    );
  }

}
