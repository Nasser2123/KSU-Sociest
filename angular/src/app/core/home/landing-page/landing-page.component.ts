import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../../shared/models/user.model";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  user: any; // Declare user property

  constructor() { }

  ngOnInit(): void {
    // Retrieve the user data from local storage in the ngOnInit method
    const userData = localStorage.getItem('user');

    if (userData) {
      this.user = JSON.parse(userData); // Assign the entire user object
    } else {
      console.log('User data not found in local storage');
    }
  }
}
