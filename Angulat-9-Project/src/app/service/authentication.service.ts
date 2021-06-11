import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { LoginModel } from '../login/models/login.model';
import { SessionStorageService } from '../service/session-storage.service';
import { TokenModel } from '../models/token.model';
import { BehaviorSubject } from 'rxjs';

const apiServer = "https://localhost:44371/api/authentication/";

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  public serviceTimer: Observable<number>;
  public userName: BehaviorSubject<string> = new BehaviorSubject<string>("");

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(private http: HttpClient,
    private sessionStorageService: SessionStorageService) {
    this.serviceTimer = null;
  }

  setUserName(userEmail: string) {
    this.userName.next(userEmail);
  }

  getUserName() {
    return this.userName;
  }

  loginUser(loginModel: LoginModel): Observable<any> {
    const url = apiServer + "login";
    return this.http.post<any>(url, JSON.stringify(loginModel)).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        return error;
      })
    );
  }

  refreshToken(refreshToken: string): Observable<any> {
    const url = apiServer + "refreshtoken";
    return this.http.post<any>(url, JSON.stringify(refreshToken)).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        return error;
      })
    );
  }

  validateUserAuthentication() {
    const session = this.sessionStorageService.getServiceTokenModel();
    var accessToken = session.accessToken;
    var refreshToken = session.refreshToken;
    if (accessToken != null && refreshToken != null) {
      return true;
    }
    else {
      return false;
    }
  }

  setTokenFromResponse(data: any) {
    const expireDate = new Date(data.accessTokenExpiry);
    const utcDate = new Date();

    const startTime = Date.UTC(utcDate.getUTCFullYear(), utcDate.getUTCMonth(),
      utcDate.getUTCDate(), utcDate.getUTCHours(), utcDate.getUTCMinutes(),
      utcDate.getUTCSeconds(), utcDate.getUTCMilliseconds());

    const expireTime = Date.UTC(expireDate.getUTCFullYear(), expireDate.getUTCMonth(),
      expireDate.getUTCDate(), expireDate.getUTCHours(), expireDate.getUTCMinutes(),
      expireDate.getUTCSeconds(), expireDate.getUTCMilliseconds());

    const model = new TokenModel();
    model.accessTokenExpiryTime = (expireTime - startTime);
    model.accessToken = data.accessToken;
    model.refreshToken = data.refreshToken;
    this.sessionStorageService.setServiceToken(model);
  } 
}
