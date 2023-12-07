import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Replace with the correct path
import { UserModel } from '../../../../shared/models/user.model';
import {Router} from "@angular/router"; // Replace with the correct path

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any; // Replace with your user model or interface
  isEditing: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  // Inside your profile component or any other component
  ngOnInit(): void {
    // Retrieve user data from local storage
    const userData = localStorage.getItem('user');

    if (userData) {
      this.user = JSON.parse(userData);
    } else {
      // Handle the case where user data is not found in local storage
      console.log('User data not found in local storage');
    }
  }
  editProfile(): void {
    // Enable editing mode
    this.router.navigate([`user/${this.user.id}/change-password`]);
  }

}
