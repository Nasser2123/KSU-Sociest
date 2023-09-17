import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DepartmentAuthService {
  private apiUrl = 'http://localhost:8000/api'
  constructor(private http: HttpClient) { }

  getDepartments(): Observable<any> {
    // Get the token from localStorage
    const token = localStorage.getItem('token');

    // Create headers with the Authorization token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Include the headers in the HTTP request
    return this.http.get<any>(`${this.apiUrl}/department`, { headers });
  }
  getDepartmentById(id: string): Observable<any> {
    // Get the token from AuthService
    const token = localStorage.getItem('token');

    // Set up headers with the token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Make an HTTP GET request to retrieve the department by ID
    return this.http.get<any>(`${this.apiUrl}/department/${id}`, { headers });
  }
  getcourses(id:number): Observable<any> {
    // Get the token from localStorage
    const token = localStorage.getItem('token');

    // Create headers with the Authorization token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Include the headers in the HTTP request
    return this.http.get<any>(`${this.apiUrl}/department/${id}/course`, { headers });
  }
  getCourseById(id: string): Observable<any> {
    // Get the token from AuthService
    const token = localStorage.getItem('token');

    // Set up headers with the token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Make an HTTP GET request to retrieve the department by ID
    return this.http.get<any>(`${this.apiUrl}/department/${id}`, { headers });
  }
}
