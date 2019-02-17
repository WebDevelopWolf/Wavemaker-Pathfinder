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
import { HomeComponent } from './admin/home/home.component';
import { AddComponent } from './admin/topic/add/add.component';
import { AddsessionComponent } from './admin/session/addsession/addsession.component';
import { BuildQuizComponent } from './admin/quiz/build-quiz/build-quiz.component';
import { LoginComponent } from './login/login.component';

import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from "angularx-social-login";
import { LoginServiceService } from './services/login-service.service';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("933803013928-4vvjqtql0nt7ve5upak2u5fhpa636ma0.apps.googleusercontent.com")
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TopicsComponent,
    ResourcesComponent,
    QuizComponent,
    UserDrawComponent,
    TopicfilterPipe,
    TopicComponent,
    GroupSessionByLevelPipe,
    SessionComponent,
    QuestionComponent,
    ReviewComponent,
    ToastComponent,
    HomeComponent,
    AddComponent,
    AddsessionComponent,
    BuildQuizComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    SocialLoginModule
  ],
  providers: [
    WmApiService, 
    BadgeService,
    LoginServiceService, {
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
