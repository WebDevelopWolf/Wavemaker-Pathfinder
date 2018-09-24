import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '../../node_modules/@angular/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
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
import { ToastComponent } from './utils/toast/toast.component';
import { EditComponent } from './educator/journey/edit/edit.component';
import { AddQuizComponent } from './educator/quiz/add-quiz/add-quiz.component';
import { DirectoryComponent } from './directory/directory.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JourneyComponent,
    HowitworksComponent,
    DetailComponent,
    QuizComponent,
    QuestionComponent,
    ReviewComponent,
    EducatorComponent,
    AddComponent,
    AssignComponent,
    ToastComponent,
    EditComponent,
    AddQuizComponent,
    DirectoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
