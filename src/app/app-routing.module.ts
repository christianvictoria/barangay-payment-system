import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Nav1Component } from './dashboard/nav1/nav1.component';
import { Nav2Component } from './dashboard/nav2/nav2.component';
import { MatTabsModule } from '@angular/material/tabs';

const routes: Routes = [
  { path: '', component : LoginComponent },
  { path: 'dashboard', component : DashboardComponent },
  { path: 'nav1', component : Nav1Component },
  { path: 'nav2', component : Nav2Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatTabsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }