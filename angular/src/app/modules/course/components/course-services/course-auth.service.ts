import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Course} from "../../../../shared/models/course.model";
import {Department} from "../../../../shared/models/department.model";

@Injectable({
  providedIn: 'root'
})
export class CourseAuthService{
  private apiUrl = 'http://localhost:8000/api/department';

  constructor(private http: HttpClient){}

  getCourses(): Observable<Course[]> {
    // Include the headers in the HTTP request
    return this.http.get<Course[]>('http://localhost:8000/api/courses').pipe(
      map(response => response['data'])
    );
  }

  addCourse(departmentId: number, course: Course): Observable<Course> {
    const formData = new FormData();
    formData.append('name', course.name);
    formData.append('slag', course.slag);
    formData.append('description', course.description);
    formData.append('hours', course.hours.toString());
    formData.append('prequisite', course.prequisite);
    formData.append('status', course.status);
    formData.append('level', course.level.toString());

    const token = localStorage.getItem('token'); // Retrieve the token from localStorage

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<Course>(`${this.apiUrl}/${departmentId}/course`, formData, { headers });
  }

  updateCourse(departmentId: number, course: Course, courseId: number): Observable<any> {
    const url = `${this.apiUrl}/${departmentId}/course/${courseId}`;
      const body = {
          ...course,
          _method: 'PUT'
      };
    // If you are using HttpHeaders for setting the Authorization header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
      'Content-Type': 'application/json'
    });
      return this.http.post(url, body, { headers });
  }
  getCourseDetails(departmentId: number, courseId: number): Observable<Course> {
    return this.http.get<{ status: string, data: Course }>(`${this.apiUrl}/${departmentId}/course/${courseId}`)
      .pipe(
        map(response => response.data) // Extract the course data from the response
      );
  }
  getCoursesBelongsToDepartment(departmentId: number): Observable<Course[]>{
    return this.http.get<{ status: string, data: Course[] }>(`${this.apiUrl}/${departmentId}/course`)
        .pipe(
          map(response => response.data)
        )
  }
  deleteCourse(departmentId: number, courseId: number): Observable<Course> {
    const data = {_method: 'DELETE'};
    // Get the token from localStorage
    const token = localStorage.getItem('token');

    // Create headers with the Authorization token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<Course>(`${this.apiUrl}/${departmentId}/course/${courseId}`, data, {headers: headers});
  }
}
