import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { DepartmentAuthService } from '../../department-services/department-auth.service';
import {AuthService} from "../../../../core/authentication/services/auth.service";
import {CourseAuthService} from "../../../course/components/course-services/course-auth.service";
import {Course} from "../../../../shared/models/course.model";

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.scss']
})
export class DepartmentDetailComponent implements OnInit {
  isLogin = this.authService.isLoggedIn();
  department: any | null = null;
  departmentId = this.route.snapshot.params["departmentId"];
  isLoading = true; // To handle loading state
  getRole: string;
  getDep: string;
  courses: Course[] = [];
  constructor(private route: ActivatedRoute, private router: Router, private departmentService: DepartmentAuthService, private changeDetectorRef: ChangeDetectorRef, private authService: AuthService, private courseAuthService: CourseAuthService) {}

  ngOnInit() {
    this.getRole = this.authService.getCurrentUserRole();
    this.getDep = this.authService.getCurrentUserDepartment();
    const id = +this.route.snapshot.params['departmentId'];
    this.departmentService.getDepartmentById(id).subscribe({
      next: (data) => {
        this.department = data; // Adjust to access nested department
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching department details', error);
        this.isLoading = false;
      },
        // complete: () => console.log('department details have been retrieved!');
      });
    this.courseAuthService.getCoursesBelongsToDepartment(this.departmentId).subscribe({
    next:(data) => {
      this.courses = data;
    },
    error: (error) => {
      console.error('Error fetching courses');
    }
  })
  }

  goToCourseDetails(courseId: number) {
    this.router.navigate(['courses', courseId], { relativeTo: this.route });

  }
  updateDepartment(departmentId: number){
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  addCourse(departmentId: number){
    this.router.navigate([`department/${departmentId}/courses/addCourse`]);
  }
  deleteCourse(courseId: number) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseAuthService.deleteCourse(this.department.id, courseId).subscribe(
        () => {
          // Handle successful deletion
          if (Array.isArray(this.department.courses)) {
            this.department.courses = this.department.courses.filter(course => course.id !== courseId);
          }
          this.ngOnInit();
          // Optionally, refresh the component or perform other update actions
          // Calling ngOnInit() directly is usually not recommended; consider refactoring
        },
        error => {
          // Handle error
          console.error('Error deleting course:', error);
        }
      );
    }
  }

}

