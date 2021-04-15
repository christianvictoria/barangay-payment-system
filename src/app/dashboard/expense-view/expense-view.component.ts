import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExpenseUpdateComponent } from '../expense-update/expense-update.component';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';

// Service 
import { Expenses } from 'src/app/models/expenses'; 

@Component({
  selector: 'app-expense-view',
  templateUrl: './expense-view.component.html',
  styleUrls: ['./expense-view.component.css']
})
export class ExpenseViewComponent implements OnInit {

  expensesPayload: any = {};
  payload: any = [];
  constructor(
    public dialog: MatDialog, 
    @Inject(MAT_DIALOG_DATA) public data,
    private dashboardService: DashboardService
    ) {}

  ngOnInit(): void {
    this.selectedExpenses();
  }
  
  selectedExpenses = async (): Promise<void> => {
    const response = await this.dashboardService.sendDashboardRequest(`expenses/${this.data}`, null);
    this.payload = response.payload[0];
    console.log(this.payload);
  }

  updateExpenses = () => {
    this.dialog.open(ExpenseUpdateComponent);
  }
}
