import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceDetailComponent } from './components/resource-detail/resource-detail.component';
import { ResourceListComponent } from './components/resource-list/resource-list.component';
import { ResourceFormComponent } from './components/resource-form/resource-form.component';



@NgModule({
  declarations: [
    ResourceDetailComponent,
    ResourceListComponent,
    ResourceFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ResourceModule { }
