import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../login/models/login.model';
import { AuthenticationService } from '../service/authentication.service';
import { SessionStorageService } from '../service/session-storage.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../../app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginModel: LoginModel = new LoginModel();

  constructor(private authenticationService: AuthenticationService,
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
  }

  login() {
    this.authenticationService.setUserName(this.loginModel.userName);
    this.authenticationService.loginUser(this.loginModel).subscribe((response) => {
      debugger;
      if (response != null) {
        this.authenticationService.setTokenFromResponse(response);
        this.getUserDetails(this.loginModel.userName);
      }
    }, (error) => {
      console.log(error);
    })
  }

  getUserDetails(emailId: string) {
    this.userService.getUserDetails(emailId).subscribe((result: any) => {
      sessionStorage.setItem("currentUser", JSON.stringify(result));
      this.router.navigate(['']);
    }, (error) => {
      alert(error);
      console.log(error);
    });
  }
}
