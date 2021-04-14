import { Component, OnInit, Inject } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ExpenseModalComponent } from '../expense-modal/expense-modal.component';
import { ExpenseAddComponent } from '../expense-add/expense-add.component';

// Service 
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';

@Component({
  selector: 'app-pending-expense',
  templateUrl: './pending-expense.component.html',
  styleUrls: ['./pending-expense.component.css']
})
export class PendingExpenseComponent implements OnInit {

  residents: any[] = [];
  constructor(
    public dialog: MatDialog, 
    @Inject(MAT_DIALOG_DATA) public data,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.getResidents();
  }

  getResidents = async (): Promise<void> => {
    const response = await this.dashboardService.sendDashboardRequest(`${this.data}/`, null);
    this.residents = response.payload;
  }
  
  AddProject(id){
    this.dialog.open(ExpenseAddComponent, { data: id });
  }

  CheckOutProject(){
    this.dialog.open(ExpenseModalComponent);
  }
}