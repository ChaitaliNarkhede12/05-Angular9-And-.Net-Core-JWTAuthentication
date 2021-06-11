import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../app/service/authentication.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SessionStorageService } from '../app/service/session-storage.service';
import { interval } from 'rxjs';
import { UserService } from '../app/service/user.service';
import { UserInfo } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ClientApp';

  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.getToken();
  }

  getToken() {
    const isAuth = this.authenticationService.validateUserAuthentication();
    if (!isAuth) {
      this.router.navigate(['/login']);
    }
    else {
      this.authenticationService.getUserName().subscribe((res: any) => {
        //this.getUserDetails(res);
        this.refreshServiceToken(false);
      }, (error) => {
        alert(error);
        console.log(error);
      });

    }
  }

  refreshServiceToken(isInit: boolean) {
    const refreshToken = this.sessionStorageService.getServiceTokenModel().refreshToken;

    this.authenticationService.refreshToken(refreshToken).subscribe((result: any) => {
      if (result) {
        this.authenticationService.setTokenFromResponse(result);

        if (!isInit) {
          this.refreshServiceTokenInIt();
          this.router.navigate(["home"]);
        }
      }
    }, (error) => {
      alert(error);
      console.log(error);
    });
  }

  refreshServiceTokenInIt() {
    const expirationTime = this.sessionStorageService.getServiceTokenModel().accessTokenExpiryTime;
    if (expirationTime > 0) {
      const intervalTime = expirationTime * 0.8;


      if (!this.authenticationService.serviceTimer) {
        this.authenticationService.serviceTimer = interval(intervalTime);
        this.authenticationService.serviceTimer.subscribe(x => {
          debugger;
          console.log('service refresh token called');
          this.refreshServiceToken(true);
        });
      }
    }
  }

  //getUserDetails(emailId: string) {
  //  this.userService.getUserDetails(emailId).subscribe((result: any) => {
  //    sessionStorage.setItem("currentUser", JSON.stringify(result));
  //    this.router.navigate(['/home/employee']);
  //  }, (error) => {
  //      alert(error);
  //      console.log(error);
  //  });
  //}
}
