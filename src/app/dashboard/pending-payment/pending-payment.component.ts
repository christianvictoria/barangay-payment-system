import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { PaymentAddComponent } from '../payment-add/payment-add.component';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';

@Component({
  selector: 'app-pending-payment',
  templateUrl: './pending-payment.component.html',
  styleUrls: ['./pending-payment.component.css']
})
export class PendingPaymentComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  
  displayedColumns: string[] = ['name', 'paymentfor', 'paymentreceive', 'purpose'];
  dataSource = new MatTableDataSource<PaymentDashboard>(ELEMENT_DATA);

  CheckOutProject(){
    this.dialog.open(PaymentModalComponent);
  }
}


export interface PaymentDashboard {
  name: string;
  paymentfor: string;
  paymentreceive:number;
  purpose: string;
}

const ELEMENT_DATA: PaymentDashboard[] = [
  {name: 'Mark Jerico Fabro', paymentfor: 'Cedula', paymentreceive: 25.00, purpose: 'Work Purpose'},
  {name: 'Christian Alip', paymentfor: 'Barangay Clearance', paymentreceive: 25.00, purpose: 'Travel Purpose'},
  {name: 'Tracey Solis', paymentfor: 'Cedula', paymentreceive: 25.00, purpose: 'Work Purpose'}
];