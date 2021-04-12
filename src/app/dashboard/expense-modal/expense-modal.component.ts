import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { CheckoutExpenseComponent } from '../checkout-expense/checkout-expense.component';

@Component({
  selector: 'app-expense-modal',
  templateUrl: './expense-modal.component.html',
  styleUrls: ['./expense-modal.component.css']
})
export class ExpenseModalComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  CheckOutProject(){
    this.dialog.open(CheckoutExpenseComponent);
  }

}
