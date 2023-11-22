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
  isAdmin: boolean = false;
  constructor(private departmentService: DepartmentAuthService, private router: Router, private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
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
  addNewDepartment(){
    this.router.navigate(['AddDepartment'], { relativeTo: this.route });
  }
  getIntoDepartment(departmentId: number): void {
    // Navigate to the department details page with the department ID
    this.router.navigate([departmentId], { relativeTo: this.route });
  }

  deleteDepartment(departmentId: number): void {
    if(confirm('Are you sure you want to delete?')) {
      this.departmentService.deleteDepartments(departmentId).subscribe(
        (response) => {
          this.router.navigate(['../'], {relativeTo: this.route});
          alert('Department has been deleted!');
        }, (error) => {
          console.log("Error: ", error);
        });
    } else alert("Delete has been canceled!")
  }

}
