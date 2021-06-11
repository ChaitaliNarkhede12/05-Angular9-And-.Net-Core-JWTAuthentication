import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SessionStorageService } from '../service/session-storage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private sessionStorageService: SessionStorageService) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.sessionStorageService.getAccessToken();
    if (request.url.toLowerCase() != "https://localhost:44371/api/authentication/login") {
      if (token != null) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }
    }
    else {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json'
        }
      });
    }
    return next.handle(request);
  }
}
