// src/app/core/authentication/components/register/register.component.ts

import {Component, OnInit} from '@angular/core';
import { UserModel } from '../../../../shared/models/user.model';
import { AuthService } from '../../services/auth.service';
import {Router} from "@angular/router";
import {Department} from "../../../../shared/models/department.model";
import {DepartmentAuthService} from "../../../../modules/department/department-services/department-auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = new UserModel();
  selectedDepartmentName: string;
  departments: Department[] = []; // Array to store departments
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router, private departmentService: DepartmentAuthService) { }
  ngOnInit() {
    this.departmentService.getDepartments().subscribe(
      data => this.departments = data,
      error => console.error('Error fetching departments', error)
    );
  }

  loadDepartments(): void {
    this.departmentService.getDepartments().subscribe(
      data => {
        this.departments = data;
      },
      error => {
        console.error('Error fetching departments', error);
      }
    );
  }

  onDepartmentChange(): void {
    const selectedDepartment = this.departments.find(dept => dept.name === this.selectedDepartmentName);
    if (selectedDepartment) {
      this.user.departmentId = selectedDepartment.id;
      this.user.departmentName = selectedDepartment.name; // Set the department name
    } else {
      this.user.departmentId = null;
      this.user.departmentName = ''; // Reset the department name
    }
  }

  register(): void {
    if (this.user.password !== this.user.confirmPassword) {
      this.errorMessage = "Passwords do not match!";
      return;
    }
    console.log('Registering user:', this.user);

    this.authService.register(this.user).subscribe(
      response => {
        // Handle successful registration, e.g., navigate to login page or show a success message
        alert('User registered successfully ! ' + response.message.toString());
        this.router.navigate(['/home']);
      },
      error => {
        console.error('Registration error:', error);
        this.errorMessage = 'Error registering user';

        // Check for validation errors in the response
        if (error.error && error.error.errors) {
          const validationErrors = error.error.errors;
          console.log('Validation errors:', validationErrors);

          // Optionally, format these errors for display
          this.errorMessage = Object.keys(validationErrors)
            .map(field => `${field}: ${validationErrors[field].join(', ')}`)
            .join('; ');
        }
      }
    );
  }
}
