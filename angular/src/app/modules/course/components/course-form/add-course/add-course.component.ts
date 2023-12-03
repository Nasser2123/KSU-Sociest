import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CourseAuthService } from "../../course-services/course-auth.service";
import { Course } from "../../../../../shared/models/course.model";

@Component({
  selector: 'add-course',
  templateUrl: './add-course.component.html',
})
export class AddCourseComponent implements OnInit {
  courseForm: FormGroup;
  departmentId: number;
  levels: number[] = Array.from({ length: 10 }, (_, i) => i + 1); // Levels 1 to 10
  hours: number[] = Array.from({ length: 6 }, (_, i) => i + 1); // Levels 1 to 10

  constructor(
    private courseService: CourseAuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.departmentId = +this.route.snapshot.params['departmentId'];

    this.courseForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(45)]),
      slag: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
      description: new FormControl('', Validators.required),
      hours: new FormControl('', [Validators.required, Validators.max(6)]),
      prequisite: new FormControl(''),
      status: new FormControl('', Validators.required),
      level: new FormControl('', [Validators.required, Validators.min(1), Validators.max(10)])
    });
  }

  onSubmit() {
    if (this.courseForm.valid) {
      this.courseService.addCourse(this.departmentId, this.courseForm.value as Course).subscribe(
        response => {
          alert('Course added successfully!');
          this.router.navigate(['/department', this.departmentId]);
        },
        error => {
          console.error('Error adding course:', error);
        }
      );
    } else {
      console.error('Form is not valid');
    }
  }
}
