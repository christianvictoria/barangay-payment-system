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
    console.log(this.data);
    this.getData();
  }

  getData(): void {
    this.ds.sendAPIRequest(`payments/${this.data.method}/` + this.data.id, null).subscribe(data => {
      this.pulledData = data.payload[0];
      console.table(data.payload);
    })
  }

  updateData = async (id: any): Promise<void> => {
    try {
      const data: any = {};
      data.pt_desc = this.pulledData.pt_desc;
      data.pt_money_recieved = this.pulledData.pt_money_recieved;
      const response = await this.ds.sendDashboardRequest("updatePayment/" + id +  "/checkup", data);
      if (response.status.remarks == "success") {
        console.log("success")
      }
    } catch(error) {
      console.log(error);
    }
  } 

  UpdateProject(){
    this.dialog.open(PaymentUpdateComponent);
  }
}
