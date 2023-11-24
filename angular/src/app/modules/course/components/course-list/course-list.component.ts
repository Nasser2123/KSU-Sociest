import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Course } from "../../../../shared/models/course.model";
import {CourseAuthService} from "../course-services/course-auth.service"; // Import your course service

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent {
  // @Input() courses: Course[] = []; // Initialize an empty array to store courses
  // course: Course;
  // departmentId: number;
  // courseId: number;
  //
  // constructor(private route: ActivatedRoute, private courseAuthService: CourseAuthService, private router: Router) {
  // }
  //
  // ngOnInit() {
  //   // @ts-ignore
  //   this.departmentId = +this.route.snapshot.paramMap.get('departmentId');
  //   // @ts-ignore
  //   this.courseId = +this.route.snapshot.paramMap.get('courseId');
  //   this.courseAuthService.getCourse(this.departmentId, this.courseId).subscribe(
  //     data => this.course = data,
  //     error => console.error(error)
  //   );
  // }
  //
  // getIntoCourse(courseId: number){}
}
