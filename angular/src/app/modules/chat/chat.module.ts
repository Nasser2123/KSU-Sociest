import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatDetailComponent } from './components/chat-detail/chat-detail.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ChatDetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class ChatModule { }
