// course-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseListComponent } from './components/course-list/course-list.component';
import {CourseFormComponent} from "./components/course-form/course-form.component";
import {CourseDetailComponent} from "./components/course-detail/course-detail.component";
import {AddCourseComponent} from "./components/course-form/add-course/add-course.component";
import {AddResourceComponent} from "../resource/components/resource-form/add-resource/add-resource.component";


const routes: Routes = [
  {
    path: 'addCourse',
    component: AddCourseComponent
  },
  {
    path: ':courseId',
    component: CourseDetailComponent
  },
  {
    path: ':courseId/addResource',
    component: AddResourceComponent,
  },
  {
    path: ':courseId/edit',
    component: CourseFormComponent
  },
  {
    path: '', pathMatch: 'full',// default path for course module
    component: CourseListComponent
  },
  {
    path: 'resources',
    loadChildren: () => import('../resource/resource.module').then(m => m.ResourceModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
