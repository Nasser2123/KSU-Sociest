import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/authentication/components/login/login.component';
import { RegisterComponent } from './core/authentication/components/register/register.component';
import { HomeComponent } from './core/home/home/home.component';
import { HeaderComponent } from './core/home/header/header.component';
import { FooterComponent } from './core/home/footer/footer.component';
import { DashboardComponent } from './core/home/dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { SearchComponent } from './search/search.component';
import { ResetPasswordComponent } from './core/authentication/components/reset-password/reset-password.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {DropdownDirective} from "./shared/directives/dropdown.directive";
import { ForgotPasswordComponent } from './core/authentication/components/forgot-password/forgot-password.component';
import { ProfileComponent } from './core/authentication/components/profile/profile.component';
import { ChangePasswordComponent } from './core/authentication/components/change-password/change-password.component';
import {ChatModule} from "./modules/chat/chat.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    SearchComponent,
    ResetPasswordComponent,
    DropdownDirective,
    ForgotPasswordComponent,
    ProfileComponent,
    ChangePasswordComponent,


  ],
  imports: [
    BrowserModule,
    ChatModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
