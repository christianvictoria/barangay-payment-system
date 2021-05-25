import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Expenses } from 'src/app/models/expenses';

// Service
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import {FormControl, Validators} from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-expense-add',
  templateUrl: './expense-add.component.html',
  styleUrls: ['./expense-add.component.css']
})
export class ExpenseAddComponent implements OnInit {

  expense_category;
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
  
  ExpenseList: any = [
    {'expenseFor': 'Airconditioner Maintenance'},
    {'expenseFor': 'Bondpaper'},
    {'expenseFor': 'Chainsaw Blade'},
    {'expenseFor': 'Cleaning Tools'},
    {'expenseFor': 'Computer'},
    {'expenseFor': 'Fan'},
    {'expenseFor': 'Feeding Program'},
    {'expenseFor': 'Fire Truck Maintenance'},
    {'expenseFor': 'Gasoline'},
    {'expenseFor': 'Internet Bill'},
    {'expenseFor': 'Light Bulb'},
    {'expenseFor': 'Marker'},
    {'expenseFor': 'Medicine'},
    {'expenseFor': 'Mobile Maintenance'},
    {'expenseFor': 'Office Chairs'},
    {'expenseFor': 'Paper Clip'},
    {'expenseFor': 'Pen'},
    {'expenseFor': 'Pencil'},
    {'expenseFor': 'Printer Ink'},
    {'expenseFor': 'Printer'},
    {'expenseFor': 'Road Tools'},
    {'expenseFor': 'Stapler Ammo'},
    {'expenseFor': 'Stapler'},
    {'expenseFor': 'Syringe'},
    {'expenseFor': 'Table'},
    {'expenseFor': 'Water Bill'},
    {'expenseFor': 'Water Dispenser'},
    {'expenseFor': 'Weighing Scale'},
    {'expenseFor': 'White Ink'},
    {'expenseFor': 'Others (Specify in Description)'},
  ];

  input = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.input.hasError('required')) {
      return 'This field is required';
    }

    return this.input.hasError('email') ? 'This field is required' : '';
  }

}
