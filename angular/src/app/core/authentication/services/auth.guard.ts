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
      const userRole = this.authService.getCurrentUserRole(); // Get the current user's role

      // Prevent logged-in users from accessing login or register pages
      if (state.url.includes('/login') || state.url.includes('/register') || state.url.includes('/reset-password')) {
        this.router.navigate(['/department']);
        return false;
      }

      // Allow only 'Admin' or 'Supervisor' to access the dashboard
      if (state.url.includes('/dashboard') && (userRole === 'Admin' || userRole === 'Supervisor')) {
        return true;
      } else if (state.url.includes('/dashboard')) {
        // Redirect non-Admin/Supervisor users trying to access the dashboard
        this.router.navigate(['/department']);
        return false;
      }

      // Allow access to other pages for logged-in users
      return true;
    } else {
      // Redirect non-logged-in users trying to access restricted pages to login
      if (state.url.includes('/dashboard') || state.url.includes('/change-password')) {
        this.router.navigate(['/login']);
        return false;
      }

      // Allow non-logged-in users to access login and register pages
      return true;
    }
  }



}
