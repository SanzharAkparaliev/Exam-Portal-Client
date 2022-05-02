import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashbordComponent } from './pages/admin/dashbord/dashbord.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';

const routes:Routes = [
{
    path:'',
    component:HomeComponent,
    pathMatch:'full',
},
{
  path:'signup',
  component:SignupComponent,
  pathMatch:'full',
},
{
  path:'login',
  component:LoginComponent,
  pathMatch:'full',
},
{
  path:'admin',
  component:DashbordComponent,
  pathMatch:'full',
  canActivate:[AdminGuard],
},

{
  path:'user-dashboard',
  component:UserDashboardComponent,
  pathMatch:'full',
  canActivate:[NormalGuard]
}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
