import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ResourceAuthService} from "../../../resource/resource-services/resource-auth.service";
import {Course} from "../../../../shared/models/course.model";
import {CourseAuthService} from "../course-services/course-auth.service";
import {AuthService} from "../../../../core/authentication/services/auth.service";
import {ResourceModel} from "../../../../shared/models/resource.model";

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  course: Course | null = null;
  isLoading = true;
  isLogin = this.authService.isLoggedIn();
  getRole: string;
  resources: ResourceModel[] = [];
  courseId: number;
  departmentId: number;
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseAuthService,
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    private resourceService: ResourceAuthService
  ) {}

  ngOnInit() {
    this.getRole = this.authService.getCurrentUserRole();
    this.departmentId = +this.route.snapshot.params['departmentId'];
    this.courseId = +this.route.snapshot.params['courseId'];

    this.courseService.getCourseDetails(this.departmentId, this.courseId).subscribe({
      next: (data) => {
        this.course = data; // Adjust to access nested department
        this.isLoading = false;
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching course details', error);
        this.isLoading = false;
      },
      // complete: () => console.log('department details have been retrieved!');
    });
    this.resourceService.getAllResourceBelongCourse(this.courseId).subscribe({
      next:(data) => {
        this.resources = data.data;
      },
      error: (error) => {
        console.error('Error fetching resources', error);
      }
    })
  }
  editCourse() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  addResource(){
    this.router.navigate([`addResource`], { relativeTo: this.route });
  }

  downloadResource(resourceId: number, resourceName: string) {
    this.resourceService.getPresignedUrl(this.courseId, resourceId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = resourceName;  // Set the file name for download
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }

  removeResource(resourceId: number) {
    this.resourceService.rejectResource(this.departmentId, resourceId).subscribe(
      response => {
        alert('Rejecting resource successfully, it has been deleted')
        console.log(response);
        this.ngOnInit(); // Reload resources to reflect changes
      },
      error => {
        alert('Error while rejecting resource!')
        console.error('Error rejecting resource', error)
      }
    );
  }

  goToChat(courseId: number, courseName: string){
    this.router.navigate([`chat/${this.departmentId}/${courseId}/${courseName}`]);
  }
}
