// src/app/department/department-list/department-list.component.ts

import { Component, OnInit } from '@angular/core';
import { DepartmentAuthService } from '../../department-services/department-auth.service';
import {ActivatedRoute, ActivatedRouteSnapshot, Router} from "@angular/router";
import {AuthService} from "../../../../core/authentication/services/auth.service";
import {Department} from "../../../../shared/models/department.model";

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  departments: Department[] = [];

  constructor(private departmentService: DepartmentAuthService, private router: Router, private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    this.departmentService.getDepartments().subscribe(
      (response) => {
        if (response.status === 'Success' && Array.isArray(response.data)) {
          this.departments = response.data;
        } else {
          console.error('Unexpected response format:', response);
        }
      },
      (error) => {
        console.error('Error fetching departments', error);
      }
    );
  }

  getIntoDepartment(departmentId: number): void {
    // Navigate to the department details page with the department ID
    this.router.navigate([departmentId], { relativeTo: this.route });
  }

}
