import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DepartmentAuthService} from "../../../department/department-services/department-auth.service"; // Import your course service

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  courses: any[] = []; // Initialize an empty array to store courses

  constructor(private route: ActivatedRoute, private departmentAuthService: DepartmentAuthService, private router: Router) { }

  ngOnInit(): void {
    // Get the department ID from the route parameters
    this.route.paramMap.subscribe(params => {
      const departmentId = +params.get('id')!; // Convert the ID to a number if needed

      // Fetch courses for the specified department
      this.departmentAuthService.getcourses(departmentId).subscribe(
        (response) => {
          if (response.status === 'Success' && response.data) {
            this.courses = response.data;
          } else {
            console.error('Failed to fetch courses:', response.message);
          }
        },
        (error) => {
          console.error('Error fetching courses:', error);
        }
      );
    });
  }

  getIntoCourse(courseId: number) {
    this.router.navigate(['/course', courseId]);
  }
}
