import { Component, OnInit } from '@angular/core';
import { CourseAuthService } from "../course-services/course-auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Course } from "../../../../shared/models/course.model";
import { AuthService } from "../../../../core/authentication/services/auth.service";

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {
  isLoading = true;
  courseId: number;
  getRole: string;
  departmentId: number;
  course: Course;
  editedCourse: Course;
  levels: number[] = Array.from({ length: 10 }, (_, i) => i + 1); // Levels 1 to 10

  constructor(
    private courseService: CourseAuthService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getRole = this.authService.getCurrentUserRole();
    this.departmentId = +this.route.snapshot.params["departmentId"];
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('courseId');
      // @ts-ignore
      this.courseId = params.get('courseId');
      if (this.courseId === null || isNaN(this.courseId)) {
        console.error('Invalid Course ID');
        this.router.navigate(['/courses', { relativeTo: this.route }]);
        return;
      }
      this.courseService.getCourseDetails(this.departmentId, this.courseId).subscribe({
        next: (data) => {
          this.course = data;
          this.editedCourse = {...data};
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching course details', error);
        },
      });
    });
  }

  onSubmit() {
    this.courseService.updateCourse(this.departmentId, this.editedCourse, this.courseId).subscribe({
      next: () => {
        this.course = {...this.editedCourse};
        alert('Course updated successfully');
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      error: (error) => {
        console.error('Error updating course', error);
      }
    });
  }
}
