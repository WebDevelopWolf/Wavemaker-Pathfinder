import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './dashboard/home/home.component';
import { JourneyComponent } from './journey/journey.component';
import { HowitworksComponent } from './journey/howitworks/howitworks.component';
import { DetailComponent } from './journey/detail/detail.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuestionComponent } from './quiz/question/question.component';
import { ReviewComponent } from './quiz/review/review.component';
import { EducatorComponent } from './educator/educator.component';
import { AddComponent } from './educator/journey/add/add.component';
import { AssignComponent } from './educator/journey/assign/assign.component';
import { EditComponent } from './educator/journey/edit/edit.component';
import { AddQuizComponent } from './educator/quiz/add-quiz/add-quiz.component';
import { DirectoryComponent } from './directory/directory.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch:'full'},
  {path: 'dashboard', component: HomeComponent},
  {path: 'journey', component: JourneyComponent},
  {path: 'journey/howitworks', component: HowitworksComponent},
  {path: 'journey/:id', component: DetailComponent},
  {path: 'quiz/:id', component: QuizComponent},
  {path: 'quiz/question/:id', component: QuestionComponent},
  {path: 'quiz/review/:id', component: ReviewComponent},
  {path: 'educator', component: EducatorComponent},
  {path: 'educator/journey/add', component: AddComponent},
  {path: 'educator/journey/assign', component: AssignComponent},
  {path: 'educator/journey/edit', component: EditComponent},
  {path: 'educator/quiz/add', component: AddQuizComponent},
  {path: 'directory', component: DirectoryComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
