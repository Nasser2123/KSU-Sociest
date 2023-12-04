import { Component, OnInit } from '@angular/core';
import {ResourceAuthService} from "../../../modules/resource/resource-services/resource-auth.service";
import {ResourceModel} from "../../../shared/models/resource.model";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../authentication/services/auth.service";
import {UserModel} from "../../../shared/models/user.model";
 // Adjust the path as necessary

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  resources: ResourceModel[] = [];
  departmentId = 1; // Example department ID
  getRole: string;
  students: any[] = [];
  supervisors: any[] = [];
  name: string;
  courseId: number;
  constructor(private resourceService: ResourceAuthService, private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    this.getRole = this.authService.getCurrentUserRole();
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      this.departmentId = user.department_id;
      this.name = user.first_name + " " + user.last_name;
      // Now you can use this.departmentId in your component
    }
    if (this.getRole == 'Supervisor') {
      this.loadResources();
    }
    if (this.getRole == 'Admin') {
      this.loadStudents();
      this.loadSupervisors();
    }
  }
  loadResources() {
    this.resourceService.getResources(this.departmentId).subscribe(
      data => {
        this.resources = data.data;

      },
      error => console.error('Error fetching resources', error)
    );
  }
  reviewResource(resourceId: number) {
    this.resourceService.reviewResource(resourceId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'review resource'; // You can set a specific file name or get it from the Content-Disposition header
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Error during download:', error);
    });
  }

  approveResource(resourceId: number) {
    this.resourceService.approveResource(this.departmentId, resourceId).subscribe(
      response => {
        alert('Approve resource successfully approved')
        console.log(response);
        this.loadResources(); // Reload resources to reflect changes
      },
      error => {
        alert('Approve resource failed');
        console.error('Error approving resource', error)
      }
    );
  }

  rejectResource(resourceId: number) {
    this.resourceService.rejectResource(this.departmentId, resourceId).subscribe(
      response => {
        alert('Rejecting resource successfully, it has been deleted')
        console.log(response);
        this.loadResources(); // Reload resources to reflect changes
      },
      error => {
        alert('Error while rejecting resource!')
        console.error('Error rejecting resource', error)
      }
    );
  }

  loadStudents(): void {
    // Assuming getStudents method in your service takes a departmentId
    // You need to provide the correct departmentId here
    const departmentId = 1; // Example department ID
    this.authService.getStudents(departmentId).subscribe(
      data => {
        this.students = data.data;
      },
      error => {
        console.error('Error loading students', error);
        // Handle error
      }
    );
  }

  loadSupervisors(): void {
    this.authService.getAllSupervisors().subscribe(
      data => {
        this.supervisors = data.data;
      },
      error => {
        console.error('Error loading supervisors', error);
        // Handle error
      }
    );
  }
  // Methods to call the service methods
  assignSupervisor(studentId: number, departmentId: number, departmentName: string) {
    this.authService.assignSupervisor(studentId, departmentId, departmentName).subscribe(
      response => {
        alert('Supervisor successfully assigned!')
        // Handle response
        console.log(response);
      },
        error => {
        alert('Error assigning Supervisor');
        console.error('Error assigning supervisor', error)
        }
    );
  }

  removeSupervisor(studentId: number) {
    this.authService.removeSupervisor(studentId).subscribe(
      response => {
        alert('Student successfully removed from Supervisor!')
        // Handle response
        console.log(response);
      },
      error => {
        alert('Error while removing Supervisor!')
        console.error('Error removing supervisor', error)
      }
    );
  }

}
