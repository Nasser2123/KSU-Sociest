import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/authentication/components/login/login.component';
import { RegisterComponent } from './core/authentication/components/register/register.component';
import { HomeComponent } from './core/home/home/home.component';
import { HeaderComponent } from './core/home/header/header.component';
import { FooterComponent } from './core/home/footer/footer.component';
import { LandingPageComponent } from './core/home/landing-page/landing-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { SearchComponent } from './search/search.component';
import { AdminComponent } from './core/authentication/components/admin/admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {DropdownDirective} from "./shared/directives/dropdown.directive";
import { ForgotPasswordComponent } from './core/authentication/components/forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LandingPageComponent,
    SearchComponent,
    AdminComponent,
    DropdownDirective,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
