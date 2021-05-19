import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { PaymentAddComponent } from '../payment-add/payment-add.component';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';
import { PaymentsService } from 'src/app/payments.service';

@Component({
  selector: 'app-pending-payment',
  templateUrl: './pending-payment.component.html',
  styleUrls: ['./pending-payment.component.css']
})
export class PendingPaymentComponent implements OnInit {

  pulledUnpaid:any;
  dataSourceUnpaid:any;
  constructor(private ds: PaymentsService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    console.log(this.data);
    this.pullUnpaid();
  }
  
  displayedColumns: string[] = ['name', 'desc', 'paymentreceive', 'date'];
  
  CheckOutProject(){
    this.dialog.open(PaymentModalComponent, { data: this.data });
  }

  pullUnpaid(): void {
    this.ds.sendAPIRequest("payments/0", null).subscribe(data => {
      this.pulledUnpaid = data.payload
      this.dataSourceUnpaid = new MatTableDataSource(this.pulledUnpaid)
      console.log(this.pulledUnpaid)
    })
  }
}


export interface PaymentDashboard {
  name: string;
  paymentfor: string;
  paymentreceive:number;
  purpose: string;
}

