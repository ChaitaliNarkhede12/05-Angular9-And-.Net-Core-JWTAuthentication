import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const apiServer = "https://localhost:44371/api/user/";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(private http: HttpClient) {
  }

  getUserDetails(userName: string): Observable<any> {
    const url = apiServer + "getUserDetails/" + userName;
    return this.http.get(url).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        return error;
      })
    );
  }

  getUserList(): Observable<any> {
    const url = apiServer + "getUserList";
    return this.http.get(url).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        return error;
      })
    );
  }
}
