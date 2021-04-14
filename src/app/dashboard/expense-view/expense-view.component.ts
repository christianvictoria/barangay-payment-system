import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExpenseUpdateComponent } from '../expense-update/expense-update.component';

import { Expenses } from 'src/app/models/expenses';

@Component({
  selector: 'app-expense-view',
  templateUrl: './expense-view.component.html',
  styleUrls: ['./expense-view.component.css']
})
export class ExpenseViewComponent implements OnInit {

  expensesPayload: Expenses;
  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data) { 
  	this.expensesPayload = new Expenses();
  }

  ngOnInit(): void {
  	this.expensesPayload = this.data;
  	console.log(this.expensesPayload);
  }
  
  UpdateProject(){
    this.dialog.open(ExpenseUpdateComponent);
  }
}
