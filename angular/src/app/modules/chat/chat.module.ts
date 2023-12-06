import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatDetailComponent } from './components/chat-detail/chat-detail.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatFormComponent } from './components/chat-form/chat-form.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ChatDetailComponent,
    ChatListComponent,
    ChatFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class ChatModule { }
