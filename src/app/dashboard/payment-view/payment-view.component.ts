import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PaymentUpdateComponent } from '../payment-update/payment-update.component';
import { PaymentsService } from 'src/app/payments.service';

@Component({
  selector: 'app-payment-view',
  templateUrl: './payment-view.component.html',
  styleUrls: ['./payment-view.component.css']
})
export class PaymentViewComponent implements OnInit {

  constructor(private ds: PaymentsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.ds.SharedData);
  }

  UpdateProject(){
    this.dialog.open(PaymentUpdateComponent);
  }
}
