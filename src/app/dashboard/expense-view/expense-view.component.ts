import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExpenseUpdateComponent } from '../expense-update/expense-update.component';

@Component({
  selector: 'app-expense-view',
  templateUrl: './expense-view.component.html',
  styleUrls: ['./expense-view.component.css']
})
export class ExpenseViewComponent implements OnInit {

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {}
  
  UpdateProject(){
    this.dialog.open(ExpenseUpdateComponent);
  }
}
