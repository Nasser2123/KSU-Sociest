import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {UserModel} from "../../../../shared/models/user.model";
import { Router} from "@angular/router";
import {of} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  getUserRole: string;
  loginForm: FormGroup;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router) {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return; // Form is invalid, do not proceed
    }

    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe(
      response => {
        if (response.status === 'success') {
          alert("Login successful")
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          localStorage.setItem('role', JSON.stringify(response.data.user.role));
          // Navigate to the dashboard or home page after successful login
          this.authService.loginSuccess();
          if (this.getUserRole !== 'Student')
          this.router.navigate(['/dashboard']);
          else
            this.router.navigate(['/department'])
        }
      },
      error => {
        alert('Login information is incorrect!');
        console.error('Error during login', error);
      }
    );
  }
}
