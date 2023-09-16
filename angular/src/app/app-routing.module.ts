import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./core/home/home/home.component";
import {RegisterComponent} from "./core/authentication/components/register/register.component";
import {LoginComponent} from "./core/authentication/components/login/login.component";
import {SearchComponent} from "./search/search.component";
import {LandingPageComponent} from "./core/home/landing-page/landing-page.component";
import {AuthGuard} from "./core/authentication/services/auth.guard";
import {ForgotPasswordComponent} from "./core/authentication/components/forgot-password/forgot-password.component";

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  { path: 'search', component: SearchComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: 'landing-page',
    component: LandingPageComponent,
    canActivate: [AuthGuard], // Apply the AuthGuard to protect this route
  },

  {
    path: 'departments',
    loadChildren: () => import('./modules/department/department.module').then(m => m.DepartmentModule)
  },
  {
    path: 'courses',
    loadChildren: () => import('./modules/course/course.module').then(m => m.CourseModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
