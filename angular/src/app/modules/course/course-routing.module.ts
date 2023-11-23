// course-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseListComponent } from './components/course-list/course-list.component';
import {CourseFormComponent} from "./components/course-form/course-form.component";
import {CourseDetailComponent} from "./components/course-detail/course-detail.component";
import {AddCourseComponent} from "./components/course-form/add-course/add-course.component";


const routes: Routes = [
  {
    path: 'edit',
    component: AddCourseComponent
  },
  {
    path: ':courseId',
    component: CourseDetailComponent
  },
  {
    path: 'add',
    component: CourseFormComponent
  },
  {
    path: '', pathMatch: 'full',// default path for course module
    component: CourseListComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
