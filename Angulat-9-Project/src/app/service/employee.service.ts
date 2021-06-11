import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { EmployeeModel } from '../models/employee.model';

const apiServer = "https://localhost:44371/api/employee/";

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }

  constructor(private http: HttpClient) { }

  getEmployeelist(): Observable<any> {
    const url = apiServer + "getEmployeeList";
    return this.http.get(url).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        return error;
      })
    );
  }

  getEmployeeById(id: number): Observable<any> {
    const url = apiServer + "getEmployeeById/" + id;
    return this.http.get(url).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        return error;
      })
    );
  }

  saveEmployee(employee: EmployeeModel): Observable<any> {
    const url = apiServer + "saveEmployee";
    return this.http.post<any>(url, JSON.stringify(employee)).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        return error;
      })
    );
  }
 

  updateEmployee(employee: EmployeeModel): Observable<any> {
    const url = apiServer + "updateEmployee";
    return this.http.put<any>(url, JSON.stringify(employee)).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        return error;
      })
    );
  }

  deleteEmployee(id: number): Observable<any> {
    const url = apiServer + "deleteEmployee/" + id;
    return this.http.delete(url).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        return error;
      })
    );
  }

  
}
