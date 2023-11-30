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
    const departmentId = +this.route.snapshot.params['departmentId'];
    const courseId = +this.route.snapshot.params['courseId'];

    this.courseService.getCourseDetails(departmentId, courseId).subscribe({
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
    this.resourceService.getAllResourceBelongCourse(1).subscribe({
      next:(data) => {
        this.resources = data;
      },
      error: (error) => {
        console.error('Error fetching resources', error);
      }
    })
  }
  editCourse() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
