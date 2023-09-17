import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentDetailComponent } from './components/department-detail/department-detail.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { DepartmentFormComponent } from './components/department-form/department-form.component';
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../../app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DepartmentRoutingModule} from "./department.routing.module";



@NgModule({
  declarations: [
    DepartmentDetailComponent,
    DepartmentListComponent,
    DepartmentFormComponent
  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
  ]
})
export class DepartmentModule { }
