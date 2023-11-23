import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { DepartmentAuthService } from '../../department-services/department-auth.service';
import {Department} from "../../../../shared/models/department.model";
import {AuthGuard} from "../../../../core/authentication/services/auth.guard";
import {AuthService} from "../../../../core/authentication/services/auth.service";
import {CourseAuthService} from "../../../course/components/course-services/course-auth.service";

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.css']
})
export class DepartmentDetailComponent implements OnInit {
  department: Department | null = null;
  isLoading = true; // To handle loading state
  isAdmin: boolean = false;
  isSupervisor: boolean = false;
  constructor(private route: ActivatedRoute, private router: Router, private departmentService: DepartmentAuthService, private changeDetectorRef: ChangeDetectorRef, private authService: AuthService, private courseAuthService: CourseAuthService) {}

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.isSupervisor = this.authService.isSupervisor();
    const id = +this.route.snapshot.params['departmentId']; // '+' converts the parameter to a number
    this.departmentService.getDepartmentById(id).subscribe(
      (department) => {
        // console.log('Department data:', department);
        this.department = department;
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      },
      (error) => {
        console.error('Error fetching department details', error);
        this.isLoading = false;
      }
    );

  }

  goToCourseDetails(courseId: number) {
    /*const departmentId = this.route.snapshot.params['departmentId'];
    // Navigate to the course-detail component
    this.router.navigate(['/department', departmentId, 'course', courseId]); // Adjust the path as per your routing configuration*/
    this.router.navigate(['courses', courseId], { relativeTo: this.route });

  }
  updateDepartment(departmentId: number){
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  addCourse(departmentId: number){
    this.router.navigate([`department/${departmentId}/course/edit`]);
  }
  deleteCourse(courseId: number) {
    if (confirm('Are you sure you want to delete this course?')) {
      // @ts-ignore
      this.courseAuthService.deleteCourse(this.department.id, courseId).subscribe(
        () => {
          // Handle successful deletion
          // Optionally, remove the course from the department.courses array to update the UI
          // @ts-ignore
          this.department.courses = this.department.courses.filter(course => course.id !== courseId);
        },
        error => {
          // Handle error
          console.error('Error deleting course:', error);
        }
      );
    }

  }

}

