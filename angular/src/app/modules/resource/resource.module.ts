import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AddResourceComponent} from "./components/resource-form/add-resource/add-resource.component";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    AddResourceComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ResourceModule { }
