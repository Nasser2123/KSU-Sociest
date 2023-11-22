import { Component, OnInit } from '@angular/core';
import { Department } from '../../../../shared/models/department.model';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DepartmentAuthService} from "../../department-services/department-auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../core/authentication/services/auth.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-department-list',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent implements OnInit {
  departmentForm: FormGroup;
  departmentId: number | null = null;
  isAdmin: boolean; // Determine if the user is an Admin

  constructor(
    private departmentService: DepartmentAuthService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin(); // Determine if the user is an admin
    this.departmentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      level: new FormControl('', Validators.required)
    });

    // Fetch and populate the form if in edit mode
    this.route.paramMap.subscribe(params => {
      const id = params.get('departmentId');
      if (id) {
        this.departmentId = parseInt(id, 10);
        this.departmentService.getDepartmentById(this.departmentId).subscribe(department => {
          this.departmentForm.patchValue({
            name: department.name,
            description: department.description,
            level: department.level
          });
        });
      }
    });
  }

  onSubmit() {
    if (this.departmentForm.valid && this.departmentId) {
      // Call the update service method
      this.departmentService.updateDepartment(this.departmentId, this.departmentForm.value).subscribe(
        () => {
          alert('Department updated!');
          this.router.navigate(['../'], { relativeTo: this.route});
        },
        (error) => {
          console.error('Error updating department:', error);
        }
      );
    }
  }
}
