// src/app/core/authentication/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { UserModel } from '../../../shared/models/user.model';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private router: Router) { }

  register(user: UserModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`,
      {
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
        password: user.password,
        password_confirmation: user.confirmPassword
      })}

  login(credentials: { email: string; password: string }): Observable<any> {
    this.isAuthenticatedSubject.next(true);

    return this.http.post<any>(`${this.baseUrl}/login`, credentials);
  }

  logout(): void {
    // Clear the token and any other user-related data from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // You might have stored user data as well

    // Optionally, you can also perform other logout-related actions (e.g., navigate to the login page)
    this.router.navigate(['/home']);
    // Example: this.router.navigate(['/login']);
    this.isAuthenticatedSubject.next(false);

  }

  isLoggedIn(): boolean {
    // Implement a check to determine if the user is logged in (e.g., check for a valid token)
    const token = localStorage.getItem('token');
    return !!token; // Return true if a token is present, otherwise false
  }
  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
}
