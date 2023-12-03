import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../../shared/models/user.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  getRole: string; // Declare user property

  constructor() {
  }

  ngOnInit(): void {
    // Retrieve the user data from local storage in the ngOnInit method
    this.getRole = localStorage.getItem('role')??'';
    if (this.getRole == 'Admin') {
     /*
     TODO: 1- getAllUploadResource(list)
      */

    }
    else if (this.getRole == 'Supervisor') {

    }
    }

  }
