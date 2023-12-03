import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-admin',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token: string | null;
  email: string;
  password: string;
  passwordConfirmation: string;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
  }

  onSubmit() {
    const resetPasswordData = {
      token: this.token,
      email: this.email,
      password: this.password,
      password_confirmation: this.passwordConfirmation
    };

    this.http.post('http://127.0.0.1:8000/api/reset-password', resetPasswordData)
      .subscribe(
        response => {
          alert('Password reset successful!')
          console.log('Password reset successful', response);
          // Handle successful response
        },
        error => {
          alert('Error resetting password!');
          console.error('Error resetting password', error);
          // Handle error response
        }
      );
  }
}
