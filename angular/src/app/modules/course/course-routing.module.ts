// course-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseListComponent } from './components/course-list/course-list.component';
import {CourseFormComponent} from "./components/course-form/course-form.component";
import {CourseDetailComponent} from "./components/course-detail/course-detail.component";


const routes: Routes = [
  {
    path: '', // default path for course module
    component: CourseListComponent
  },
  {
    path: 'add',
    component: CourseFormComponent
  },
  {
    path: 'edit/:id',
    component: CourseFormComponent
  },
  {
    path: ':id', // dynamic route for viewing course details
    component: CourseDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
