// src/app/core/authentication/services/auth.service.ts

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, map, Observable} from 'rxjs';
import { UserModel } from '../../../shared/models/user.model';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private router: Router) { }

 /* isAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const payload = token.split('.')[1]; // Get the payload
      const decodedPayload = atob(payload); // Base64 decode
      const payloadObj = JSON.parse(decodedPayload); // Parse JSON

      // Assuming the role information is stored in a property called 'role'
      return payloadObj.data.user.role === 'Admin';
    } catch (error) {
      console.error('Error decoding token', error);
      return false;
    }
  }*/

  // Check if a token exists in local storage
  private hasToken(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
  // Observable to track authentication status
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  getUserProfile() {

  }

  register(user: UserModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`,
      {
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
        password: user.password,
        password_confirmation: user.confirmPassword
      })}

  /*login(credentials: { email: string; password: string }): Observable<any> {
    // Assuming you set the token upon successful login
    this.isAuthenticatedSubject.next(true);
    return this.http.post<any>(`${this.baseUrl}/login`, credentials);
  }*/
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials).pipe(
      map(response => {
        if (response.status === 'Success') {
          // Store the token and role in local storage
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('role', response.data.user.role);

          // Update the isAuthenticatedSubject
          this.isAuthenticatedSubject.next(true);
        }
        return response;
      })
    );
  }
  isAdmin(): boolean {
    const role = localStorage.getItem('role');
    return role === 'Admin';
  }

  isSupervisor(): boolean {
    const role = localStorage.getItem('role');
    return role === 'Supervisor'
  }
  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/forgot-password`, {
      email: email
    });
  }

  changePassword(userId: number, oldPassword: string, newPassword: string, confirmPassword: string): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = {
      old_password: oldPassword,
      password: newPassword,
      password_confirmation: confirmPassword,
      id: userId
    };

    return this.http.post(`${this.baseUrl}/user/${userId}/change-password`, body, { headers });
  }

  isLoggedIn(): boolean {
    // Implement a check to determine if the user is logged in (e.g., check for a valid token)
    const token = localStorage.getItem('token');
    return !!token; // Return true if a token is present, otherwise false
  }
  logout(): void {
    // Clear the token and any other user-related data from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // You might have stored user data as well

    // Update the isAuthenticatedSubject to false
    this.isAuthenticatedSubject.next(false);

    // Optionally, you can also perform other logout-related actions (e.g., navigate to the login page)
    this.router.navigate(['/home']);
  }
}
