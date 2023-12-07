import {Component, ElementRef, ViewChild, AfterViewChecked, ChangeDetectorRef} from '@angular/core';
import { ChatService } from "../chat-services/chat.service";
import Pusher from "pusher-js";
import { AuthService } from "../../../../core/authentication/services/auth.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.css']
})
export class ChatDetailComponent implements AfterViewChecked {
  messages: any[] = [];
  newMessage: string = '';
  courseId: number;
  currentUserId: string;
  currentUserFirstName: string;
  isSupervisor: boolean;
  senderName: string;
  courseName: string;
  userDepartment: number;
  depatrmentId: boolean;

  message: string;
  sending: boolean;

  @ViewChild('chatContainer') private chatContainer: ElementRef;

  constructor(private chatService: ChatService, private authService: AuthService, private route: ActivatedRoute, private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    // @ts-ignore
    const user = JSON.parse(localStorage.getItem('user'));
    this.currentUserId = user && user.id;
    this.currentUserFirstName = user && user.firstName;
    this.isSupervisor = user && user.role === 'Supervisor';
    this.senderName = user.first_name + " " + user.last_name;
    this.depatrmentId = user.department_id === +this.route.snapshot.params['departmentId'];

    this.courseId = +this.route.snapshot.params['chatId'];
    this.courseName = this.route.snapshot.params['courseName'];
    this.chatService.getMessages(this.courseId).subscribe((messages: any[]) => {
      // console.log('Initial messages:', messages);
      this.messages = messages;
    });


    const pusher = new Pusher('b5f407cb235d23b10973', {
      cluster: 'ap2'
    });
    const channel = pusher.subscribe(`chat${this.courseId}`);
    channel.bind('message', (data: any) => {
      // console.log('New message from Pusher:', data);

      // Check if user object and user.id are present in the received message
      if (data.user && data.user.id !== undefined) {
        // Add a user_id property to the message for easy comparison in the template
        const messageWithUserId = { ...data, user_id: data.user.id };
        this.messages.push(messageWithUserId);
      } else {
        console.error('user_id is missing in the received message');
      }
      this.changeDetector.detectChanges(); // Trigger change detection
    });

  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.chatService.sendMessage(this.courseId, this.newMessage).subscribe(() => {
        this.newMessage = '';
        this.changeDetector.detectChanges(); // Trigger change detection
      });
    }
  }

  deleteMessage(messageId: string): void {
    this.chatService.deleteMessage(this.courseId, messageId).subscribe(() => {
      this.messages = this.messages.filter(message => message.id !== messageId);
    });
  }
}
