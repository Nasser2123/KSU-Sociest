import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceDetailComponent } from './components/resource-detail/resource-detail.component';
import { ResourceListComponent } from './components/resource-list/resource-list.component';
import { ResourceFormComponent } from './components/resource-form/resource-form.component';
import {AddResourceComponent} from "./components/resource-form/add-resource/add-resource.component";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ResourceDetailComponent,
    ResourceListComponent,
    ResourceFormComponent,
    AddResourceComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ResourceModule { }
