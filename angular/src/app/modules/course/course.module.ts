import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import {RouterLink} from "@angular/router";
import {CourseRoutingModule} from "./course-routing.module";




@NgModule({
    declarations: [
        CourseDetailComponent,
        CourseListComponent,
        CourseFormComponent
    ],
    exports: [
        CourseListComponent
    ],
  imports: [
    CommonModule,
    RouterLink,
    CourseRoutingModule,

  ]
})
export class CourseModule { }
