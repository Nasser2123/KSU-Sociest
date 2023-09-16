import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./core/home/home/home.component";
import {RegisterComponent} from "./core/authentication/components/register/register.component";
import {LoginComponent} from "./core/authentication/components/login/login.component";
import {SearchComponent} from "./search/search.component";
import {LandingPageComponent} from "./core/home/landing-page/landing-page.component";
import {AuthGuard} from "./core/authentication/services/auth.guard";

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'search', component: SearchComponent},
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
