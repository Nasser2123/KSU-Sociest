import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DepartmentAuthService } from '../../department-services/department-auth.service';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.css']
})
export class DepartmentDetailComponent implements OnInit {
  department: any;

  constructor(private route: ActivatedRoute, private departmentService: DepartmentAuthService) {}

  ngOnInit(): void {
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
  }
}
