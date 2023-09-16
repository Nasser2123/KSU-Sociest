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

  loginForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  onSubmit(): void {
    const credentials = this.loginForm.value;
    this.authService.login(credentials).subscribe(
      (response) => {
        // Handle a successful login response
        confirm('Login successful');
        const token = response.data.token;
        const user = response.data.user;

        // Store user data as a string
        localStorage.setItem('user', JSON.stringify(user));
        // Save the token to local storage or a secure storage mechanism
        localStorage.setItem('token', token);
        // Redirect to a different page or perform further actions
        this.router.navigate(['/landing-page']);
      },
      (error) => {
        // Handle login error
        console.error('Login failed:', error);
      }
    );
  }
}























  //
  //
  // passwordForm: FormGroup;
  // loginForm: FormGroup;
  // user = new UserModel();
  // errorMessage: string;
  // toggled = false;
  //
  // constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }
  //
  // ngOnInit(): void {
  //   this.loginForm = this.formBuilder.group({
  //     email: ['', [Validators.required, Validators.email]],
  //     password: ['', [Validators.required, Validators.minLength(1)]]
  //   });
  //   this.passwordForm = this.formBuilder.group(
  //     {
  //       email: ['', [Validators.required, Validators.email]]
  //     }
  //   );
  // }
  //
  // onSubmit() {
  //   if (this.loginForm.valid) {
  //     console.log(this.loginForm.value);
  //     this.authService.login(this.user).subscribe(
  //       response => {
  //         // Handle successful registration, e.g., navigate to login page or show a success message
  //         alert(response.message.toString());
  //         this.router.navigate(['/home']);
  //         console.log('User registered successfully !')
  //       },
  //       error => {
  //         alert(error.message.toString());
  //         this.errorMessage = error.message || 'An error occurred during registration.';
  //       }
  //     );
  //   }
  // }
  // onForgotPassword(){
  //   if (this.passwordForm.valid) {
  //     console.log(this.passwordForm.value);
  //     this.authService.forgotPassword(this.user).subscribe(
  //       response => {
  //         // Handle successful registration, e.g., navigate to login page or show a success message
  //         confirm('Reset link has been sent to your email.');
  //         alert(response.message.toString());
  //         this.router.navigate(['/home']);
  //         console.log('Reset link has been sent to your email.!');
  //       },
  //       error => {
  //         alert(error.message.errorMessage.toString());
  //         this.errorMessage = error.message || 'An error occurred during registration.';
  //       }, () => {
  //         // return of({ success: true, message: 'Reset link has been sent to your email.' });
  //       }
  //     );
  //   }
  // }
  // toggle() {
  //   this.toggled = !this.toggled;
  // }
// }

