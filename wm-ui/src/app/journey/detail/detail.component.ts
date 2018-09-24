import { Component, OnInit } from '@angular/core';
import { WmApiService } from '../../wm-api.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(private _wmapi: WmApiService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  id: number;
  private sub: any;
  journey: any;
  userSignedToJourney: boolean;
  lessons: any;
  relatedJourney: any;
  vidUrl: any;

  ngOnInit() {
    this.getJourney();
    this.journeyLessons();
    this.getRelatedJourney();
  }

  // Get Journey Details
  getJourney() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; 
      this._wmapi
      .getService("Journey/" + this.id)
      .then((result) => {
        this.journey = result;
        this.userRegisteredToJourney();
        this.vidUrl = this.sanitizer.bypassSecurityTrustResourceUrl(result.JourneyVideo);
      })
      .catch(error => console.log(error));
    });
  }

  // Register Trailblazer to Journey
  signOnToJourney() {
    this._wmapi
    .getService("Journey/Signon/" + this.id + "/" + this._wmapi.tempuser)
    .then((result) => {
      this.userSignedToJourney = true;
    })
    .catch(error => console.log(error));
  }

  // Check if Trailblazer is already on Journey
  userRegisteredToJourney() {
    this._wmapi
    .getService("Journey/TrailblazerRegistered/" + this.id + "/" + this._wmapi.tempuser)
    .then((result) => {
      if (result == 1) this.userSignedToJourney = true; else this.userSignedToJourney = false;
      console.log(this.userSignedToJourney);
    })
    .catch(error => console.log(error));
  }

  // TODO: Get registered Trailblazers
  
  // Get Lesson List
  journeyLessons() {
    this._wmapi
    .getService("Journey/Lessons/" + this.id)
    .then((result) => {
      // Push Lessons to UI
      this.lessons = result;
    })
    .catch(error => console.log(error));
  }

  // Get Related Journey
  getRelatedJourney() {
    this._wmapi
    .getService("Journey/Related/" + this.id)
    .then((result) => {
      // Push Lessons to UI
      this.relatedJourney = result;
    })
    .catch(error => console.log(error));
  }

}
