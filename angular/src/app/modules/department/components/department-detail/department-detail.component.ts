import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { DepartmentAuthService } from '../../department-services/department-auth.service';
import {Department} from "../../../../shared/models/department.model";
import {AuthGuard} from "../../../../core/authentication/services/auth.guard";
import {AuthService} from "../../../../core/authentication/services/auth.service";

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
  constructor(private route: ActivatedRoute, private router: Router, private departmentService: DepartmentAuthService, private changeDetectorRef: ChangeDetectorRef, private authService: AuthService) {}

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

  addCourse(){
    this.router.navigate(['course/edit']);
  }
  deleteCourse(courseId: number, departmentId: number) {
    // TODO: delete the course by calling deleteCourse()
  }

  /*ngOnInit(): void {
    // Get the department id from the route parameter
    this.route.paramMap.subscribe(params => {
      const departmentId = params.get('id');
      if (departmentId) {
        // Fetch department details using the departmentId
        this.fetchDepartmentDetails(departmentId);
      }
    });
  }

  fetchDepartmentDetails(departmentId: string): void {
    this.departmentService.getDepartmentById(departmentId).subscribe(
      (response) => {
        if (response.status === 'Success' && response.data) {
          this.department = response.data;
        } else {
          console.error('Failed to fetch department details:', response.message);
        }
      },
      (error) => {
        console.error('Error fetching department details:', error);
      }
    );
  }*/

}
/*
how to implement department-form in order to edit current department (name, description, and level).
and this is Postman api:
POST:
key | value
_method | PUT
name | any name
description | ...discription
level | any number
Authorization type Bearer Token
*/
