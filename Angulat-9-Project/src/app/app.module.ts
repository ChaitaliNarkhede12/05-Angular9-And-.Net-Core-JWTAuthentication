import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'

import { HomeModule } from '../app/home/home.module';
import { LoginComponent } from './login/login.component';

import { JwtInterceptor } from '../app/helper/jwt.interceptor';
import { UserService } from '../app/service/user.service';
import { EmployeeService } from '../app/service/employee.service';
import { AuthenticationService } from '../app/service/authentication.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    HomeModule
  ],
  providers: [
    AuthenticationService,
    EmployeeService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
