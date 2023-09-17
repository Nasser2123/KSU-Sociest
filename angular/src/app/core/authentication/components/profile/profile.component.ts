import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Replace with the correct path
import { UserModel } from '../../../../shared/models/user.model';
import {Router} from "@angular/router"; // Replace with the correct path

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
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


  // loadUserProfile(): void {
  //   if (this.authService.isLoggedIn()) {
  //     // If the user is logged in (has a valid token), fetch the user profile data
  //     this.authService.getUserProfile().subscribe(
  //       (userData) => {
  //         this.user = userData;
  //       },
  //       (error) => {
  //         console.error('Error loading user profile:', error);
  //       }
  //     );
  //   } else {
  //     // Handle the case where the user is not logged in
  //     console.log('User is not logged in.');
  //     // You can choose to redirect to the login page or show a message to the user.
  //   }
  // }

  editProfile(): void {
    // Enable editing mode
    this.router.navigate(['/change-password'])
  }

  // editProfile(): void {
  //   // Save the edited profile data to your AuthService or API
  //   this.authService.updateUserProfile(this.user).subscribe(
  //     () => {
  //       // Profile update successful
  //       this.isEditing = false; // Disable editing mode
  //       alert('Profile updated successfully.');
  //     },
  //     (error) => {
  //       // Handle profile update error
  //       console.error('Error updating user profile:', error);
  //       alert('Error updating user profile. Please try again.');
  //     }
  //   );
  // }
}
