import { Component, OnInit } from '@angular/core';
import { Department } from '../../../../shared/models/department.model';

import {ActivatedRouteSnapshot, Router} from "@angular/router";

@Component({
  selector: 'app-department-list',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent implements OnInit {
  departments: Department[];

  constructor(private router: Router) { }

  ngOnInit(): void { }

  seeCourses(department: Department): void {
    // Here you can implement the logic to navigate to the courses page for the specific department
    this.router.navigate([`departments/${department.id}`])
    console.log(`Courses for ${department.name}:`, department.courses);
  }
}
