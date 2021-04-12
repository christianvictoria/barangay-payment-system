import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { CheckoutPaymentComponent } from '../checkout-payment/checkout-payment.component';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.css']
})
export class PaymentModalComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  CheckOutProject(){
    this.dialog.open(CheckoutPaymentComponent);
  }

}
