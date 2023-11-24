import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import {RouterLink} from "@angular/router";
import {CourseRoutingModule} from "./course-routing.module";
import {AddCourseComponent} from "./components/course-form/add-course/add-course.component";
import {ReactiveFormsModule} from "@angular/forms";




@NgModule({
    declarations: [
        CourseDetailComponent,
        CourseListComponent,
        CourseFormComponent,
        AddCourseComponent
    ],
    exports: [
        CourseListComponent
    ],
  imports: [
    CommonModule,
    RouterLink,
    CourseRoutingModule,
    ReactiveFormsModule,

  ]
})
export class CourseModule { }
