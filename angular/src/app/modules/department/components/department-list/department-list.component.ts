// src/app/department/department-list/department-list.component.ts

import { Component, OnInit } from '@angular/core';
import { DepartmentAuthService } from '../../department-services/department-auth.service';
import {ActivatedRouteSnapshot, Router} from "@angular/router";
import {AuthService} from "../../../../core/authentication/services/auth.service";

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  departments: any[] = [];

  constructor(private departmentService: DepartmentAuthService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchDepartments();
  }

  fetchDepartments(): void {
    this.departmentService.getDepartments().subscribe(
      (response) => {
        if (response.status === 'Success' && response.data) {
          this.departments = response.data;
        } else {
          console.error('Failed to fetch departments:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching departments:', error);
      }
    );
  }
  getIntoDepartment(departmentId: number): void {
    // Navigate to the department details page with the department ID
    this.router.navigate(['/department', departmentId]);
  }
}
