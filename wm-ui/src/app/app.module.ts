import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '../../node_modules/@angular/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './dashboard/home/home.component';
import { JourneyComponent } from './journey/journey.component';
import { HowitworksComponent } from './journey/howitworks/howitworks.component';
import { DetailComponent } from './journey/detail/detail.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JourneyComponent,
    HowitworksComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
