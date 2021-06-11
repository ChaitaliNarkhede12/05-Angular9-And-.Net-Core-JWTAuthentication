import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { SessionStorageService } from '../service/session-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private sessionStorageService: SessionStorageService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    debugger;
    const user = this.sessionStorageService.getUserFromSession();
    debugger;
    if (user != null) {
      debugger;
      // logged in so return true
      return true;
    } else {
      debugger;
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login']);
      return false;
    }
  }
}
