import { Component } from '@angular/core';
import {CourseAuthService} from "../course-services/course-auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Course} from "../../../../shared/models/course.model";
import {AuthService} from "../../../../core/authentication/services/auth.service";

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent {
  isLoading = true;
  courseId: number | null;
  getRole: string;
  departmentId = this.route.snapshot.params["departmentId"];
  course: Course;
  editedCourse: Course;
  constructor(
    private courseService: CourseAuthService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getRole = this.authService.getCurrentUserRole(); // Check if user is Admin
    this.route.paramMap.subscribe(params => {
        const idParam = params.get('courseId');
        this.courseId = idParam ? +idParam : null // The '+' operator converts the string to a number
        // Now you can use 'departmentId' to fetch data or for other purposes
        if (this.courseId === null || isNaN(this.courseId)) {
          console.error('Invalid Course ID');
          this.router.navigate(['/courses', { relativeTo: this.route}]);
          return;
        }
      this.courseService.getCourseDetails(this.departmentId, this.courseId).subscribe({
        next: (data) => {
          this.course = data;
          this.editedCourse = {...data};
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching department details', error);
        },
      })
      }
    );}
  onSubmit() {
      this.courseService.updateCourse(this.departmentId, this.editedCourse).subscribe({
        next: () => {
          this.course = {...this.editedCourse}; // Update the course details
          alert('Course updated successfully');
          this.router.navigate(['../'] , { relativeTo: this.route})
        },
        error: (error) => {
          console.error('Error updating course', error);
          // Optionally, show an error message
        }
      });
  }
}
