import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CheckoutPaymentComponent } from '../checkout-payment/checkout-payment.component';
import { PaymentsService } from 'src/app/payments.service';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.css']
})
export class PaymentModalComponent implements OnInit {

  constructor(private ds: PaymentsService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  	console.log("payment: ", this.data);
    
  }

  CheckOutProject(){
    this.dialog.open(CheckoutPaymentComponent, { data: this.data });
  }

}
