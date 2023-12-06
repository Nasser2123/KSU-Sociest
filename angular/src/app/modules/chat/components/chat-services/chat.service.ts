import { Injectable } from '@angular/core';

import Pusher from 'pusher-js';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  pusher: any;
  private apiUrl = 'http://127.0.0.1:8000/api/course/';
  constructor(private http: HttpClient) {
    this.pusher = new Pusher('b5f407cb235d23b10973', {
      cluster: 'ap2'
    });
  }

  getMessages(courseId: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
    });
    return this.http.get(`${this.apiUrl}${courseId}/message`, {headers:headers}).pipe(
      map((response: any) => response.data) // Extracting the 'data' array
    );
  }

  sendMessage(courseId: number, message: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
    });

    return this.http.post(`${this.apiUrl}${courseId}/message`, { message }, { headers: headers});
  }

  deleteMessage(courseId: number, messageId: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assuming token is stored in localStorage
    });
    return this.http.delete(`${this.apiUrl}${courseId}/message/${messageId}`, { headers: headers});
  }
}
