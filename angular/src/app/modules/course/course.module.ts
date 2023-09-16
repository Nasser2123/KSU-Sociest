import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseFormComponent } from './components/course-form/course-form.component';



@NgModule({
  declarations: [
    CourseDetailComponent,
    CourseListComponent,
    CourseFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CourseModule { }
