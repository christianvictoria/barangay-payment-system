import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ExpenseModalComponent } from '../expense-modal/expense-modal.component';

@Component({
  selector: 'app-pending-expense',
  templateUrl: './pending-expense.component.html',
  styleUrls: ['./pending-expense.component.css']
})
export class PendingExpenseComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  
  displayedColumns: string[] = ['name', 'paymentfor', 'paymentreceive', 'purpose'];
  dataSource = new MatTableDataSource<PaymentDashboard>(ELEMENT_DATA);

  CheckOutProject(){
    this.dialog.open(ExpenseModalComponent);
  }
}

export interface PaymentDashboard {
  name: string;
  paymentfor: string;
  paymentreceive:number;
  purpose: string;
}

const ELEMENT_DATA: PaymentDashboard[] = [
  {name: 'Christian Alip', paymentfor: 'Clean Up Drive', paymentreceive: 15000.00, purpose: 'For Equipments'},
  {name: 'Tracey Solis', paymentfor: 'Feeding Program', paymentreceive: 20000.00, purpose: 'For Children'},
  {name: 'Mark Jerico Fabro', paymentfor: 'Clean Up Drive', paymentreceive: 25000.00, purpose: 'For Equipments'}
];