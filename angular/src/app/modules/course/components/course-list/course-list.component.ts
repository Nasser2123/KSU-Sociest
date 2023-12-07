import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Course } from "../../../../shared/models/course.model";
import {CourseAuthService} from "../course-services/course-auth.service";
import {Department} from "../../../../shared/models/department.model";
import {DepartmentAuthService} from "../../../department/department-services/department-auth.service";
import {AuthService} from "../../../../core/authentication/services/auth.service"; // Import your course service

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  isLoading = false;
  constructor(private courseService: CourseAuthService, private router: Router, private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    this.courseService.getCourses().subscribe({
      next: (data) => {
        // console.log("Received data:", data); // Debugging line
        this.courses = data;
        this.filteredCourses = data;
        this.isLoading = false;
      },
      error: (err) => console.error(err),
      // complete: () => console.log('Department data retrieval complete')
    });
  }


  searchCourses(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.filteredCourses = this.courses.filter(course =>
      course.name.toLowerCase().includes(value.toLowerCase()) ||
      course.slag.toLowerCase().includes(value.toLowerCase())
    );
  }


 /* addNewCourse(){
    this.router.navigate(['AddCourse'], { relativeTo: this.route });
  }
  getIntoCourse(departmentId: number): void {
    // Navigate to the department details page with the department ID
    this.router.navigate([departmentId], { relativeTo: this.route });
  }
  deleteCourse(departmentId: number): void {
    if(confirm('Are you sure you want to delete?')) {
      this.courseService.deleteCourse(Co).subscribe(
        (response) => {
          alert('Department has been deleted!');
          this.router.navigate(['department']);
          this.ngOnInit();
        }, (error) => {
          console.log("Error: ", error);
        });
    } else alert("Delete has been canceled!")
  }
*/
}
