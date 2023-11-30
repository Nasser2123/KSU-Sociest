import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../../shared/models/user.model";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  user: UserModel; // Declare user property

  constructor() {
  }

  ngOnInit(): void {
    // Retrieve the user data from local storage in the ngOnInit method
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const userData = JSON.parse(userJson);
      this.user = {
        id: userData.id,
        firstName: userData.first_name,
        lastName: userData.last_name,
        role: userData.role,
      }
    }
  }
}
