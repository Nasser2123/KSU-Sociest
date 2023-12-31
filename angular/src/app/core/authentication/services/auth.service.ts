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

  // getStudentById(): Observable<any>{
  //   return this.http.get(this.baseUrl)
  // }
  // Check if a token exists in local storage
  private hasToken(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
  // Observable to track authentication status
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  register(user: UserModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, {
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      password: user.password,
      password_confirmation: user.confirmPassword,
      department_id: user.departmentId,
      department_name: user.departmentName // Include this if required
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { email, password });
  }
  // Call this method after successful login
  loginSuccess() {
    this.isAuthenticatedSubject.next(true);
  }
  isLoggedIn(): boolean {
    // Implement a check to determine if the user is logged in (e.g., check for a valid token)
    const token = localStorage.getItem('token');
    return !!token; // Return true if a token is present, otherwise false
  }
  getCurrentUserRole(): string {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user: UserModel = JSON.parse(userData);
      return user.role;
    }
    return '';
  }
  getCurrentUserDepartment(): string {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user: any = JSON.parse(userData);
      return user.department_name;
    }
    return '';
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
  forgotPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/forgot-password`, {
      email: email
    });
  }
  logout(): void {
    // Clear the token and any other user-related data from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    // Update the isAuthenticatedSubject to false
    this.isAuthenticatedSubject.next(false);

    // Optionally, you can also perform other logout-related actions (e.g., navigate to the login page)
    this.router.navigate(['/home']);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    this.http.post(`${this.baseUrl}/logout`, { headers: headers});
  }

  assignSupervisor(studentId: number, departmentId: number, departmentName: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post(`${this.baseUrl}/student/${studentId}/addSupervisor`, {
      department_id: departmentId,
      department_name: departmentName
    }, { headers });
  }
  removeSupervisor(studentId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post(`${this.baseUrl}/supervisor/${studentId}/removeSupervisor`, {}, { headers });
  }
  getAllSupervisors(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get(`${this.baseUrl}/supervisors`, { headers });
  }
  getStudents(departmentId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get(`${this.baseUrl}/students/${departmentId}`, { headers });
  }


}


