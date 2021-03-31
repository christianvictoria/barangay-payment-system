import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Nav1Component } from './dashboard/nav1/nav1.component';
import { Nav2Component } from './dashboard/nav2/nav2.component';
import { Nav3Component } from './dashboard/nav3/nav3.component';
import { Nav4Component } from './dashboard/nav4/nav4.component';
import { PaymentDashboardComponent } from './dashboard/payment-dashboard/payment-dashboard.component';
import { MatTabsModule } from '@angular/material/tabs';

const routes: Routes = [
  { path: '', component : LoginComponent },
  { path: 'dashboard', component : DashboardComponent },
  { path: 'nav1', component : Nav1Component },
  { path: 'nav2', component : Nav2Component },
  { path: 'nav3', component : Nav3Component },
  { path: 'nav4', component : Nav4Component },
  { path: 'payment-dashboard', component : PaymentDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatTabsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }