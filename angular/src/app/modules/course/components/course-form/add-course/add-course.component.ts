import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CourseAuthService} from "../../course-services/course-auth.service";
import {Course} from "../../../../../shared/models/course.model";

class CourseService {
}

@Component({
  selector: 'add-course',
  templateUrl: './add-course.component.html',

})
export class AddCourseComponent implements OnInit {
  courseForm: FormGroup;
  departmentId: number;

  constructor(
    private courseService: CourseAuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Retrieve the departmentId from the route parameters or some other means
    this.departmentId = +this.route.snapshot.params['departmentId'];

    this.courseForm = new FormGroup({
      name: new FormControl('', Validators.required),
      slag: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      hours: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
      prequisite: new FormControl(''),
      status: new FormControl('', Validators.required),
      level: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)])
    });
  }

  onSubmit() {
    if (this.courseForm.valid) {
      this.courseService.addCourse(this.departmentId, this.courseForm.value as Course).subscribe(
        response => {
          alert('Course added successfully!');
          this.router.navigate(['/departments', this.departmentId, 'courses']);
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
