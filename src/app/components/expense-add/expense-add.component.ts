import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Expenses } from 'src/app/models/expenses';

// Service
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-expense-add',
  templateUrl: './expense-add.component.html',
  styleUrls: ['./expense-add.component.css']
})
export class ExpenseAddComponent implements OnInit {

  official: any[] = [];
  expensesPayload: Expenses;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data, 
    private dashboardService: DashboardService,
  ) { 
    this.expensesPayload = new Expenses(); 
  }

  ngOnInit(): void {}

  newExpenses = async (): Promise<void> => { 
    try {
      const response = await this.dashboardService.sendDashboardRequest('newExpenses/', this.expensesPayload);
      if (response.status.remarks == "success") { 
        await Swal.fire('Success!', 'New expense added', 'success');
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
