import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {ActivatedRoute, Router} from "@angular/router";
import {UserModel} from "../../../../shared/models/user.model"; // Replace with the correct path

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  userId: number; // Set this to the current user's ID
  errorMessage: string;
  constructor(private authService: AuthService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }

  onChangePassword() {
    this.userId = +this.route.snapshot.params['userId'];

    if (this.changePasswordForm.valid) {
      const { oldPassword, newPassword, confirmPassword } = this.changePasswordForm.value;
      this.authService.changePassword(this.userId, oldPassword, newPassword, confirmPassword).subscribe(
        () => {
          // Handle success
          alert('Password changed successfully');
          this.router.navigate(['/profile'])
        },
        error => {
          // Handle error
          console.error('Error changing password:', error);
        }
      );
    } else {
      if (this.changePasswordForm.hasError('mismatch')) {
        console.log('New password and confirmation do not match.');
      }
    }
  }
}
