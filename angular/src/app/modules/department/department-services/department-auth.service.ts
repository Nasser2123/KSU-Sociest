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

  addDepartment(department: Department): Observable<Department> {
    const formData = new FormData();
    formData.append('name', department.name);
    formData.append('description', department.description);
    formData.append('level', department.level.toString()); // Ensure level is a string

    const token = localStorage.getItem('token'); // Replace with your token retrieval logic

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<Department>(`${this.apiUrl}/department`, formData, { headers });
  }
  // TODO
  updateDepartment(departmentId: number, department: Department): Observable<Department> {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('name', department.name);
    formData.append('description', department.description);
    formData.append('level', department.level.toString());

    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<Department>(`${this.apiUrl}/department/${departmentId}`, formData, { headers });
  }

  deleteDepartments(departmentId: number): Observable<Department>{
    const data = { _method: 'DELETE'};
    // Get the token from localStorage
    const token = localStorage.getItem('token');

    // Create headers with the Authorization token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<Department>(`${this.apiUrl}/department/${departmentId}`, data, {headers:headers});
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
