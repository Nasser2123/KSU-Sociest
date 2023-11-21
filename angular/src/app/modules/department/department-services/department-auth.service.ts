import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Department} from "../../../shared/models/department.model";

@Injectable({
  providedIn: 'root'
})
export class DepartmentAuthService {
  private apiUrl = 'http://localhost:8000/api'
  constructor(private http: HttpClient) { }

  getDepartments(): Observable<any> {
    // // Get the token from localStorage
    // const token = localStorage.getItem('token');
    //
    // // Create headers with the Authorization token
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${token}`
    // });

    // Include the headers in the HTTP request
    return this.http.get<any>(`${this.apiUrl}/department`);
  }
  getDepartmentById(id: number): Observable<Department> {
    // // Get the token from AuthService
    // const token = localStorage.getItem('token');
    //
    // // Set up headers with the token
    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${token}`,
    // });

    /*// Make an HTTP GET request to retrieve the department by ID
    return this.http.get<Department>(`${this.apiUrl}/department/${id}`);*/
    return this.http.get<{status: string, data: Department}>(`${this.apiUrl}/department/${id}`)
      .pipe(
        map(response => response.data) // Extract the department data from the response
      );
  }
  getcourses(id:number): Observable<any> {
    // // Get the token from localStorage
    // const token = localStorage.getItem('token');
    //
    // // Create headers with the Authorization token
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${token}`
    // });

    // Include the headers in the HTTP request
    return this.http.get<any>(`${this.apiUrl}/department/${id}`);
  }
  getCourseById(id: string): Observable<any> {
    // // Get the token from AuthService
    // const token = localStorage.getItem('token');
    //
    // // Set up headers with the token
    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${token}`,
    // });

    // Make an HTTP GET request to retrieve the department by ID
    return this.http.get<any>(`${this.apiUrl}/department/${id}`);
  }
}
