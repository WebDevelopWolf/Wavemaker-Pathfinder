import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopicsComponent } from './topics/topics.component';
import { ResourcesComponent } from './resources/resources.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuestionComponent } from './question/question.component';
import { ResultComponent } from './result/result.component';

import { WmApiService } from './services/wm-api.service';
import { UserDrawComponent } from './utilities/user-draw/user-draw.component';
import { TopicfilterPipe } from './pipes/topicfilter.pipe';
import { TopicComponent } from './topic/topic.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TopicsComponent,
    ResourcesComponent,
    QuizComponent,
    QuestionComponent,
    ResultComponent,
    UserDrawComponent,
    TopicfilterPipe,
    TopicComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [WmApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
