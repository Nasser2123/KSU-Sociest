// course-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DepartmentListComponent } from './components/department-list/department-list.component';
import { DepartmentDetailComponent } from './components/department-detail/department-detail.component';
import { DepartmentFormComponent } from './components/department-form/department-form.component';

const routes: Routes = [
  {
    path: ':departmentId', // dynamic route for viewing department details
    component: DepartmentDetailComponent
  },
  {
    path: ':departmentId/course',
    loadChildren: () => import('../course/course.module').then(m => m.CourseModule)
  },
  {
    path: 'add',
    component: DepartmentFormComponent
  },
  {
    path: 'edit/:departmentId',
    component: DepartmentFormComponent
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
