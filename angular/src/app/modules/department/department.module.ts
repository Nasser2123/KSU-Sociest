import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentDetailComponent } from './components/department-detail/department-detail.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { DepartmentFormComponent } from './components/department-form/department-form.component';

import {DepartmentRoutingModule} from "./department.routing.module";
import {CourseModule} from "../course/course.module";



@NgModule({
  declarations: [
    DepartmentDetailComponent,
    DepartmentListComponent,
    DepartmentFormComponent
  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    CourseModule,

  ]
})
export class DepartmentModule { }
