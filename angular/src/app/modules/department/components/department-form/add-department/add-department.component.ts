import {Component, OnInit} from '@angular/core';
import {DepartmentAuthService} from "../../../department-services/department-auth.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../../../core/authentication/services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  departmentForm: FormGroup;
  getRole: string;

  constructor(
    private departmentService: DepartmentAuthService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getRole = this.authService.getCurrentUserRole(); // Check if user is Admin
    this.departmentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      level: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.departmentForm.valid) {
      this.departmentService.addDepartment(this.departmentForm.value).subscribe(
        () => {
          alert('Department Added Successfully!');
          this.router.navigate(['/department']); // Navigate to departments list
        },
        (error) => {
          console.error('Error adding department:', error);
        }
      );
    }
  }
}
