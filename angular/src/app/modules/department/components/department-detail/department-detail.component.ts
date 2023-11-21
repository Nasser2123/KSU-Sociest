import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { DepartmentAuthService } from '../../department-services/department-auth.service';
import {Department} from "../../../../shared/models/department.model";

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.css']
})
export class DepartmentDetailComponent implements OnInit {
  department: Department | null = null;
  isLoading = true; // To handle loading state

  constructor(private route: ActivatedRoute, private router: Router, private departmentService: DepartmentAuthService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
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
