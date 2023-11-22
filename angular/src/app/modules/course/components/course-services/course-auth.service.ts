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

  // getCourses(): Observable<Course[]> {
  //   return this.http.get<Course[]>(`${this.baseUrl}/courses`);
  // }

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

  getCourseDetails(departmentId: number, courseId: number): Observable<Course> {
    return this.http.get<{ status: string, data: Course }>(`${this.apiUrl}/${departmentId}/course/${courseId}`)
      .pipe(
        map(response => response.data) // Extract the course data from the response
      );
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
