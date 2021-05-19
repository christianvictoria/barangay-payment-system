import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExpenseUpdateComponent } from '../expense-update/expense-update.component';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';

// Service 
import { Expenses } from 'src/app/models/expenses'; 

import Swal from 'sweetalert2';

@Component({
  selector: 'app-expense-view',
  templateUrl: './expense-view.component.html',
  styleUrls: ['./expense-view.component.css']
})
export class ExpenseViewComponent implements OnInit {

  expensesPayload: Expenses;
  constructor(
    public dialog: MatDialog, 
    @Inject(MAT_DIALOG_DATA) public data,
    private dashboardService: DashboardService
    ) {
    this.expensesPayload = new Expenses();
  }  
  ngOnInit(): void  {this.selectedExpenses(); }
  selectedExpenses = async (): Promise<void> => {
    try {
      const response = await this.dashboardService.sendDashboardRequest(`expenses/${this.data}`, null);
      this.expensesPayload = response.payload[0];
    } catch(error) {
      await Swal.fire('Oops...', 'Something went wrong', 'error');
    }
  }
  updateExpenses = async (): Promise<void> => {
    try {
      const response = await this.dashboardService.sendDashboardRequest(`updateExpenses/${this.data}`, this.expensesPayload);
      if (response.status.remarks == "success") {
        await Swal.fire('Success!', 'Expense is successfully modified', 'success');
        this.sendMessage();
      }
    } catch(error) {
      await Swal.fire('Oops...', 'Something went wrong', 'error');
    }
  }
  sendMessage = (): void => {
    this.dashboardService.updateResponse('Message from Sender Component to Receiver Component!');
  }
}
