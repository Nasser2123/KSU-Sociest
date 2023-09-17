import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // Replace with the correct path

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  errorMessage: string;
  user: any;
  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');

    if (userData) {
      this.user = JSON.parse(userData);
    } else {
      // Handle the case where user data is not found in local storage
      console.log('User data not found in local storage');
    }


    // Initialize the changePasswordForm with form controls and validators
    this.changePasswordForm = this.fb.group({
      old_password: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(2)]],
      password_confirmation: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.changePasswordForm.invalid) {
      // Form is invalid, do not proceed
      return;
    }
    const id = this.user.id;
    const formData = this.changePasswordForm.value;

    // Call the AuthService method to change the password
    this.authService.changePassword(formData, id).subscribe(
      () => {
        // Password change successful
        alert('Password changed successfully.');
        // You can redirect the user to a different page or perform other actions here
      },
      (error) => {
        // Password change failed, handle the error
        this.errorMessage = error.message || 'An error occurred while changing the password.';
      }
    );
  }
}
