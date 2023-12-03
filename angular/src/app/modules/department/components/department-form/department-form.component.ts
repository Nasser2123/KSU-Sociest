import { Component, OnInit } from '@angular/core';
import { Department } from '../../../../shared/models/department.model';
import { DepartmentAuthService } from "../../department-services/department-auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../../../core/authentication/services/auth.service";

@Component({
  selector: 'app-department-list',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent implements OnInit {
  isLoading = true;
  department: Department;
  editedDepartment: Department;
  departmentId: number;
  getRole: string;
  nameError: boolean = false;
  levels: number[] = Array.from({length: 10}, (_, i) => i + 1); // Array of levels from 1 to 20

  constructor(
    private departmentService: DepartmentAuthService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getRole = this.authService.getCurrentUserRole(); // Check if user is Admin
    this.route.paramMap.subscribe(params => {
      // @ts-ignore
      this.departmentId = +params.get(`departmentId`);
      if (isNaN(this.departmentId)) {
        console.error('Invalid department ID');
        this.router.navigate(['/department']);
        return;
      }

      this.departmentService.getDepartmentById(this.departmentId).subscribe({
        next: (data) => {
          this.department = data;
          this.editedDepartment = {...data};
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching department details', error);
        },
      });
    });
  }

  onSubmit() {
    if (this.isValidForm()) {
      this.departmentService.updateDepartment(this.departmentId, this.editedDepartment).subscribe({
        next: () => {
          this.department = {...this.editedDepartment}; // Update the department details
          this.router.navigate(['../'], { relativeTo: this.route});
        },
        error: (error) => {
          alert('Error updating department details!');
          console.error('Error updating department', error);
          // Optionally, show an error message
        }
      });
    }
  }

  isValidForm() {
    this.nameError = this.editedDepartment.name.length > 20;
    return !this.nameError && this.editedDepartment.name.trim() !== '' && this.editedDepartment.description.trim() !== '';
  }
}
