import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./core/home/home/home.component";
import {RegisterComponent} from "./core/authentication/components/register/register.component";
import {LoginComponent} from "./core/authentication/components/login/login.component";
import {SearchComponent} from "./search/search.component";
import {DashboardComponent} from "./core/home/dashboard/dashboard.component";
import {AuthGuard} from "./core/authentication/services/auth.guard";
import {ForgotPasswordComponent} from "./core/authentication/components/forgot-password/forgot-password.component";
import {ProfileComponent} from "./core/authentication/components/profile/profile.component";
import {ChangePasswordComponent} from "./core/authentication/components/change-password/change-password.component";
import {ResetPasswordComponent} from "./core/authentication/components/reset-password/reset-password.component";
import {AddResourceComponent} from "./modules/resource/components/resource-form/add-resource/add-resource.component";
import {CourseDetailComponent} from "./modules/course/components/course-detail/course-detail.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/:userId/change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'landing-page',
    component: DashboardComponent,
    canActivate: [AuthGuard], // Apply the AuthGuard to protect this route
  },
  {
    path: 'department',
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/department/department.module').then(m => m.DepartmentModule)
      },
      {
        path: ':departmentId/courses',
        loadChildren: () => import('./modules/course/course.module').then(m => m.CourseModule)
      },
    ]
  },
  {
    path: 'courses',
    loadChildren: () => import('./modules/course/course.module').then(m => m.CourseModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
