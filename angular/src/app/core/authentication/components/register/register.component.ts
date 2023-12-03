// src/app/core/authentication/components/register/register.component.ts

import { Component } from '@angular/core';
import { UserModel } from '../../../../shared/models/user.model';
import { AuthService } from '../../services/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user = new UserModel();
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) { }

  register(): void {
    if (this.user.password !== this.user.confirmPassword) {
      this.errorMessage = "Passwords do not match!";
      return;
    }

    this.authService.register(this.user).subscribe(
      response => {
        // Handle successful registration, e.g., navigate to login page or show a success message
        alert('User registered successfully ! ' + response.message.toString());
        this.router.navigate(['/home']);
      },
      error => {
        alert('Error registering, please make sure you have entered correct values and try again!');
        // this.errorMessage = error.message + 'error while registration' || 'An error occurred during registration.';
      }
    );
  }
}
