import { Component, OnInit } from '@angular/core';
import { WmApiService } from '../../wm-api.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userSignedToJourney: boolean;

  constructor(private _wmapi: WmApiService, private comp: AppComponent) { }

  ngOnInit() {
    this.comp.getUserProfile();
    this.userRegisteredToJourney();
  }
  
  // Check if Trailblazer is already on Journey
  userRegisteredToJourney() {
    this._wmapi
    .getService("Journey/TrailblazerRegistered/" + this._wmapi.tempuser)
    .then((result) => {
      if (result == 1) this.userSignedToJourney = true; else this.userSignedToJourney = false;
    })
    .catch(error => console.log(error));
  }

}
