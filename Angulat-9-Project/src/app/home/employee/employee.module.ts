import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { EmployeeComponent } from '../../home/employee/employee.component';
import { EmployeeRoutingModule } from '../employee/employee-routing.module';

@NgModule({
  declarations: [
    EmployeeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    EmployeeRoutingModule
  ],
  providers: [],
  bootstrap: [EmployeeComponent]
})
export class EmployeeModule { }
