import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { UserRoutingModule } from '../user/user-routing.module';
import { UserComponent } from '../user/user.component';

@NgModule({
  declarations: [
    UserComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule
  ],
  providers: [
    //EmployeeService
  ],
  bootstrap: [UserComponent]
})
export class UserModule { }
