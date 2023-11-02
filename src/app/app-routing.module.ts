import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { Page404Component } from './page404/page404.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { BugsComponent } from './main/bugs/bugs.component';
import { ProjectsComponent } from './main/projects/projects.component';

const routes: Routes = [
  {
    component: HomeComponent,
    path: ''
  },
  {
    component: SignupComponent,
    path: 'signup'
  },
  {
    component: LoginComponent,
    path: 'login'
  },
  {
    component: ProjectsComponent,
    path: 'projects',
    canActivate: [AuthGuard]
  },
  {
    component: BugsComponent,
    path: 'bugs',
    canActivate: [AuthGuard]
  },
  {
    component: Page404Component,
    path: '**'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
