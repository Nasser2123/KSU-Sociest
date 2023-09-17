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
}
