import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DepartmentListComponent } from './components/department-list/department-list.component';
import { DepartmentDetailComponent } from './components/department-detail/department-detail.component';
import { DepartmentFormComponent } from './components/department-form/department-form.component';
import {AddDepartmentComponent} from "./components/department-form/add-department/add-department.component";
import {CourseDetailComponent} from "../course/components/course-detail/course-detail.component";
import {AddResourceComponent} from "../resource/components/resource-form/add-resource/add-resource.component";

const routes: Routes = [

  {
    path: ':departmentId/courses',
    loadChildren: () => import('../course/course.module').then(m => m.CourseModule)
  },
  {
    path: 'AddDepartment',
    component: AddDepartmentComponent
  },
  {
    path: ':departmentId', // dynamic route for viewing department details
    component: DepartmentDetailComponent
  },
  {
    path: ':departmentId/edit',
    component: DepartmentFormComponent
  },
  {
    path: ':departmentId/courses',
    loadChildren: () => import('../resource/resource.module').then(m => m.ResourceModule)
  },
  {
    path: '', pathMatch: 'full', // default path for department module
    component: DepartmentListComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
