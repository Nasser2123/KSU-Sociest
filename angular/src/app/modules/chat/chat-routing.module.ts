// course-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatDetailComponent } from './components/chat-detail/chat-detail.component';
import { ChatFormComponent } from './components/chat-form/chat-form.component';

const routes: Routes = [
  {
    path: '', // default path for department module
    component: ChatListComponent
  },
  {
    path: 'add',
    component: ChatFormComponent
  },
  {
    path: 'edit/:id',
    component: ChatFormComponent
  },
  {
    path: ':id', // dynamic route for viewing department details
    component: ChatDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
