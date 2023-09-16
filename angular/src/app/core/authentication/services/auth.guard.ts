import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      // User is logged in
      if (state.url.includes('/login') || state.url.includes('/register') || state.url.includes('/home')) {
        // If logged in, prevent access to login or register pages
        this.router.navigate(['/landing-page']);
        return false;
      }
      return true; // Allow access to other pages
    } else {
      // User is not logged in
      if (state.url.includes('/landing-page')) {
        // If not logged in, prevent access to the landing page
        this.router.navigate(['/login']);
        return false;
      }
      return true; // Allow access to login and register pages
    }
  }
}
