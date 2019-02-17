import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopicsComponent } from './topics/topics.component';
import { ResourcesComponent } from './resources/resources.component';
import { QuizComponent } from './quiz/quiz.component';
import { TopicComponent } from './topic/topic.component';
import { SessionComponent } from './session/session.component';
import { QuestionComponent } from './quiz/question/question.component';
import { ReviewComponent } from './quiz/review/review.component';
import { HomeComponent } from './admin/home/home.component';
import { AddComponent } from './admin/topic/add/add.component';
import { AddsessionComponent } from './admin/session/addsession/addsession.component';
import { BuildQuizComponent } from './admin/quiz/build-quiz/build-quiz.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch:'full'},
  {path: 'dashboard', component: DashboardComponent },
  {path: 'topics', component: TopicsComponent },
  {path: 'resources', component: ResourcesComponent },
  {path: 'quiz/:id', component: QuizComponent},
  {path: 'quiz/question/:id', component: QuestionComponent},
  {path: 'quiz/review/:id', component: ReviewComponent},
  {path: 'topic/:id', component: TopicComponent },
  {path: 'session/:id', component: SessionComponent },
  {path: 'admin', component: HomeComponent },
  {path: 'admin/topic/add', component: AddComponent },
  {path: 'admin/session/add', component: AddsessionComponent },
  {path: 'admin/quiz/build', component: BuildQuizComponent },
  {path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
