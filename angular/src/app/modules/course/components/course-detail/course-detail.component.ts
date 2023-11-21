import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DepartmentAuthService} from "../../../department/department-services/department-auth.service";
import {HttpClient} from "@angular/common/http";
import {Course} from "../../../../shared/models/course.model";
import {CourseAuthService} from "../course-services/course-auth.service";
import {AuthService} from "../../../../core/authentication/services/auth.service"; // Import your course service

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  course: Course | null = null;
  isLoading = true;
  userIsLoggedIn = false;
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseAuthService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userIsLoggedIn = this.authService.isLoggedIn();
    const departmentId = +this.route.snapshot.params['departmentId'];
    const courseId = +this.route.snapshot.params['courseId'];
    this.courseService.getCourseDetails(departmentId, courseId).subscribe(
      (course) => {
        this.course = course;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching course details', error);
        this.isLoading = false;
      }
    );
  }

}
