import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopicsComponent } from './topics/topics.component';
import { ResourcesComponent } from './resources/resources.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuestionComponent } from './question/question.component';
import { ResultComponent } from './result/result.component';
import { TopicComponent } from './topic/topic.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch:'full'},
  {path: 'dashboard', component: DashboardComponent },
  {path: 'topics', component: TopicsComponent },
  {path: 'resources', component: ResourcesComponent },
  {path: 'quiz', component: QuizComponent },
  {path: 'question', component: QuestionComponent },
  {path: 'result', component: ResultComponent },
  {path: 'topic/:id', component: TopicComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
