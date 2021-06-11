import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { LoginModel } from '../login/models/login.model';
import { TokenModel } from '../models/token.model';

const apiServer = "https://localhost:44371/api/authentication/";

@Injectable({
  providedIn: 'root'
})

export class SessionStorageService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(private http: HttpClient) { }

  setServiceToken(data: any) {
    sessionStorage.setItem("accessToken", data.accessToken);
    sessionStorage.setItem("refreshToken", data.refreshToken);
    sessionStorage.setItem("accessTokenExpiryTime", data.accessTokenExpiryTime.toString());
  }

  getAccessToken() {
    return sessionStorage.getItem("accessToken");
  }

  getUserFromSession() {
    var user = sessionStorage.getItem("currentUser");
    if (user != null) {
      return user;
    }
    return null;
  }

  getServiceTokenModel() {
    const tokenModel = new TokenModel();
    tokenModel.accessToken = sessionStorage.getItem("accessToken");
    tokenModel.refreshToken = sessionStorage.getItem("refreshToken");
    const expireTime = sessionStorage.getItem("accessTokenExpiryTime");
    if (expireTime) {
      tokenModel.accessTokenExpiryTime = Number.parseInt(expireTime);
    }
    else {
      tokenModel.accessTokenExpiryTime = 300000;
    }
    return tokenModel;
  }
}
