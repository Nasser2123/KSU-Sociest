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

  getAllResourceBelongCourse(resourceId: number) {
    return this.http.get<any>(`${this.apiUrl}/course/${resourceId}/resource`)
  }
}
