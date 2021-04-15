import { Component, OnInit, Inject} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentUpdateComponent } from '../payment-update/payment-update.component';
import { PaymentsService } from 'src/app/payments.service';


@Component({
  selector: 'app-payment-view',
  templateUrl: './payment-view.component.html',
  styleUrls: ['./payment-view.component.css']
})
export class PaymentViewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data, private ds: PaymentsService, public dialog: MatDialog) { }

  pulledData: any = {};

  ngOnInit(): void {
    //   console.log(this.ds.SharedData);
    console.log(this.data);
    this.getData();
  }

  getData(): void {
    this.ds.sendAPIRequest("payments/checkup/" + this.data, null).subscribe(data => {
      this.pulledData = data.payload[0]
      console.log(data.payload)
    })
  }

  UpdateProject(){
    this.dialog.open(PaymentUpdateComponent);
  }
}
