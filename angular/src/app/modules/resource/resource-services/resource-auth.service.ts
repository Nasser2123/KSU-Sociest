import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Department} from "../../../shared/models/department.model";
import {Course} from "../../../shared/models/course.model";

@Injectable({
  providedIn: 'root'
})
export class ResourceAuthService {
  private apiUrl = 'http://localhost:8000/api'
  constructor(private http: HttpClient) { }

  addResource(courseId: number, formData: FormData) {
    const url = `${this.apiUrl}/course/${courseId}/resource`;

    // If you are using HttpHeaders for setting the Authorization header
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
      'Accept': 'application/json'
    });

    return this.http.post(url, formData, { headers: headers });
  }
  getAllResourceBelongCourse(courseId: number) {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
    });
    return this.http.get<any>(`${this.apiUrl}/course/${courseId}/resource`, { headers: headers});
  }
  getPresignedUrl(courseId: number, resourceId: number): Observable<Blob> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
    });
    return this.http.get(`${this.apiUrl}/course/${courseId}/resource/${resourceId}`, {
      headers: headers,
      responseType: 'blob'  // Set responseType to 'blob'
    });
  }
  reviewResource(resourceId: number): Observable<Blob> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    // @ts-ignore
    return this.http.get(`${this.apiUrl}/downloadResource/${resourceId}`, { headers, responseType: 'blob' as 'json' });
  }

  getResources(departmentId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.get(`${this.apiUrl}/department/${departmentId}/resource`, { headers });
  }
  approveResource(departmentId: number, resourceId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post(`${this.apiUrl}/department/${departmentId}/resource/${resourceId}/approve`, {}, { headers });
  }
  rejectResource(departmentId: number, resourceId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post(`${this.apiUrl}/department/${departmentId}/resource/${resourceId}/reject`, {}, { headers });
  }

  getAllResources(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${this.apiUrl}/resources`, {headers:headers});
  }

}
