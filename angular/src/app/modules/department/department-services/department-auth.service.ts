import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Department} from "../../../shared/models/department.model";
import {Course} from "../../../shared/models/course.model";

@Injectable({
  providedIn: 'root'
})
export class DepartmentAuthService {
  private apiUrl = 'http://localhost:8000/api'
  constructor(private http: HttpClient) { }

  getDepartments(): Observable<any> {
    // Include the headers in the HTTP request
    return this.http.get<any>(`${this.apiUrl}/department`).pipe(
      map(response => response['data'])
    );
  }
  getDepartmentById(id: number): Observable<Department> {
    /*// Make an HTTP GET request to retrieve the department by ID
    return this.http.get<Department>(`${this.apiUrl}/department/${id}`);*/
    return this.http.get<{status: string, data: any}>(`${this.apiUrl}/department/${id}`)
      .pipe(
        map(response => response.data.department) // Extract the department data from the response
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

    updateDepartment(departmentId: number, department: Department): Observable<any> {
        const url = `${this.apiUrl}/department/${departmentId}`;
        const data = {
          _method: 'PUT',
          name: department.name,
          level: department.level,
          description: department.description
        }
        // If you are using HttpHeaders for setting the Authorization header
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
            'Content-Type': 'application/json'
        });
        return this.http.post(url, data, {headers});
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

}
