import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { LoginComponent } from '../login/login.component';
import { AuthenticationService } from '../service/authentication.service';
import { SessionStorageService } from '../service/session-storage.service';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [AuthenticationService, SessionStorageService],
  bootstrap: [LoginComponent]
})
export class LoginModule { }
