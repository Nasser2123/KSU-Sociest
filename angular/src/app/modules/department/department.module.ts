import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentDetailComponent } from './components/department-detail/department-detail.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { DepartmentFormComponent } from './components/department-form/department-form.component';

import {DepartmentRoutingModule} from "./department.routing.module";
import {CourseModule} from "../course/course.module";
import {ReactiveFormsModule} from "@angular/forms";
import {AddDepartmentComponent} from "./components/department-form/add-department/add-department.component";




@NgModule({
  declarations: [
    DepartmentDetailComponent,
    DepartmentListComponent,
    DepartmentFormComponent,
    AddDepartmentComponent
  ],
    imports: [
        CommonModule,
        DepartmentRoutingModule,
        CourseModule,
        ReactiveFormsModule,

    ]
})
export class DepartmentModule { }
