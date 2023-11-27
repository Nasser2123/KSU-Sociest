import { Component, OnInit } from '@angular/core';
import { Department } from '../../../../shared/models/department.model';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DepartmentAuthService} from "../../department-services/department-auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../core/authentication/services/auth.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Course} from "../../../../shared/models/course.model";

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
   id = +this.route.snapshot.params['departmentId'];  getRole: string;
  constructor(
    private departmentService: DepartmentAuthService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {

  }

  ngOnInit() {
    this.getRole = this.authService.getCurrentUserRole(); // Check if user is Admin
    this.route.paramMap.subscribe(params => {
        const idParam = params.get('departmentId');
        this.departmentId = idParam ? +idParam : 0; // The '+' operator converts the string to a number
      // Now you can use 'departmentId' to fetch data or for other purposes
        if (this.departmentId === null || isNaN(this.departmentId)) {
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
    })
    });
  }
  onSubmit() {
    this.departmentService.updateDepartment(this.departmentId, this.editedDepartment).subscribe({
      next: () => {
        this.department = {...this.editedDepartment}; // Update the course details
        this.router.navigate(['../'], { relativeTo: this.route});
      },
      error: (error) => {
        console.error('Error updating department', error);
        // Optionally, show an error message
      }}
    );
  }
}
