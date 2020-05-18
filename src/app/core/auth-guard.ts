
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
    constructor(private route: Router) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

      if ( JSON.parse(localStorage.getItem('isValidUser'))){

        return true;
      }

      this.route.navigate(['/login']);
      return false;
    }
}
