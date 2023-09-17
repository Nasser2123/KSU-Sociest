import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DepartmentAuthService} from "../../../department/department-services/department-auth.service"; // Import your course service

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  course: any;

  constructor(private route: ActivatedRoute, private departmentAuthService: DepartmentAuthService) {}

  ngOnInit(): void {
    // Get the course id from the route parameter
    this.route.paramMap.subscribe(params => {
      const courseId = params.get('id');
      if (courseId) {
        // Fetch course details using the courseId
        this.fetchCourseDetails(courseId);
      }
    });
  }

  fetchCourseDetails(courseId: string): void {
    this.departmentAuthService.getCourseById(courseId).subscribe(
      (response) => {
        if (response.status === 'Success' && response.data) {
          this.course = response.data;
        } else {
          console.error('Failed to fetch course details:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching course details:', error);
      }
    );
  }
}
