import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Course} from "../../../../shared/models/course.model";

@Injectable({
  providedIn: 'root'
})
export class CourseAuthService{
  private apiUrl = 'http://localhost:8000/api/department';

  constructor(private http: HttpClient){}

  // getCourses(): Observable<Course[]> {
  //   return this.http.get<Course[]>(`${this.baseUrl}/courses`);
  // }

  getCourseDetails(departmentId: number, courseId: number): Observable<Course> {
    return this.http.get<{ status: string, data: Course }>(`${this.apiUrl}/${departmentId}/course/${courseId}`)
      .pipe(
        map(response => response.data) // Extract the course data from the response
      );
  }
}
