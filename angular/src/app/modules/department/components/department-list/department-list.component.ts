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
    this.isAdmin = this.authService.getCurrentUserRole() === 'Admin';
    this.departmentService.getDepartments().subscribe({
      next: (data) => {
        // console.log("Received data:", data); // Debugging line
        this.departments = data;
      },
      error: (err) => console.error(err),
      // complete: () => console.log('Department data retrieval complete')
    });
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
          alert('Department has been deleted!');
          this.router.navigate(['department']);
          this.ngOnInit();
        }, (error) => {
          console.log("Error: ", error);
        });
    } else alert("Delete has been canceled!");
  }

}
