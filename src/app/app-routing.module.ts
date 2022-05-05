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
import { ProfileComponent } from './pages/profile/profile.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { ViewCategoryComponent } from './pages/admin/view-category/view-category.component';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewQuestionsComponent } from './pages/admin/view-questions/view-questions.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { UpdateCategoryComponent } from './pages/admin/update-category/update-category.component';

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
  canActivate:[AdminGuard],
  children:[
    {
      path:'',
      component:WelcomeComponent,
    },
    {
    path:'profile',
    component:ProfileComponent,
    },
    {
      path:'categories',
      component:ViewCategoryComponent,
    },
    {
      path:'addcategories',
      component:AddCategoryComponent
    },
    {
      path:'quizzes',
      component:ViewQuizzesComponent
    },{
      path:'addquiz',
      component:AddQuizComponent
    },
    {
      path:'quiz/:qid',
      component:UpdateQuizComponent,
    },
    {
      path:'viewquestion/:id/:title',
      component:ViewQuestionsComponent
    },
    {
      path:'addquestion/:qid/:title',
      component:AddQuestionComponent,
    },
    {
      path:'category/:cid',
      component:UpdateCategoryComponent,
    },
  ]
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
