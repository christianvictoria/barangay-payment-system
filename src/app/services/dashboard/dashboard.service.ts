import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  BASE_URL = 'http://localhost/barangay-payment-system/barangay-payment-api/';
  constructor(private http: HttpClient) { }
  
  private subject = new Subject<any>();

  public sendDashboardRequest = async (endpoint, data): Promise<any> => {
  	const response: any = await this.http.post(this.BASE_URL + btoa(endpoint), btoa(JSON.stringify(data))).toPromise();
  	return response;
  }

  updateResponse(message: string) {
    this.subject.next({ text: message });
  }

  getUpdate(): Observable<any> {
    return this.subject.asObservable();
  }
}
