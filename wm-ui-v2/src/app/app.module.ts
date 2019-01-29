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
import { ResultComponent } from './result/result.component';

import { WmApiService } from './services/wm-api.service';
import { UserDrawComponent } from './utilities/user-draw/user-draw.component';
import { TopicfilterPipe } from './pipes/topicfilter.pipe';
import { TopicComponent } from './topic/topic.component';
import { GroupSessionByLevelPipe } from './pipes/group-session-by-level.pipe';
import { SessionComponent } from './session/session.component';
import { QuestionComponent } from './quiz/question/question.component';
import { ReviewComponent } from './quiz/review/review.component';
import { ToastComponent } from './utilities/toast/toast.component';
import { BadgeService } from './services/badge-service.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TopicsComponent,
    ResourcesComponent,
    QuizComponent,
    ResultComponent,
    UserDrawComponent,
    TopicfilterPipe,
    TopicComponent,
    GroupSessionByLevelPipe,
    SessionComponent,
    QuestionComponent,
    ReviewComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [WmApiService, BadgeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
