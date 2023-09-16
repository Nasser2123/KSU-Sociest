// course-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ResourceListComponent } from './components/resource-list/resource-list.component';
import { ResourceDetailComponent } from './components/resource-detail/resource-detail.component';
import { ResourceFormComponent } from './components/resource-form/resource-form.component';

const routes: Routes = [
  {
    path: '', // default path for department module
    component: ResourceListComponent
  },
  {
    path: 'add',
    component: ResourceFormComponent
  },
  {
    path: 'edit/:id',
    component: ResourceFormComponent
  },
  {
    path: ':id', // dynamic route for viewing department details
    component: ResourceDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResourceRoutingModule { }
