import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  userId: number; // Set this to the current user's ID

  constructor(private authService: AuthService, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.userId = +this.route.snapshot.params['userId'];
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')?.value === form.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  onChangePassword() {
    if (this.changePasswordForm.valid) {
      const { oldPassword, newPassword, confirmPassword } = this.changePasswordForm.value;
      this.authService.changePassword(this.userId, oldPassword, newPassword, confirmPassword).subscribe(
        () => {
          // Handle success
          alert('Password changed successfully');
          this.router.navigate(['/profile']);
        },
        error => {
          // Handle error
          alert('Old password is incorrect!! Please enter your old password correctly');
          // console.error('Error changing password:', error);
        }
      );
    } else {
      if (this.changePasswordForm.hasError('mismatch')) {
        console.log('New password and confirmation do not match.');
      }
    }
  }
}
