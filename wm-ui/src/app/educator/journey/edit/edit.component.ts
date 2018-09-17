import { Component, OnInit } from '@angular/core';
import { WmApiService } from '../../../wm-api.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  JourneyTitle: string;
  JourneyDescription: string;
  JourneyIntroVideo: string;
  JourneyRewards: string;
  JourneyGains: string;
  JourneyCompletionTime: string;
  XpReward: number;
  journeySuccess: boolean;
  journeyList: any;
  journeyEdit: any;

  constructor(private _wmapi: WmApiService) { }

  ngOnInit() {
    this.loadJourneys();
  }

  // Get Journeys from Data
  loadJourneys() {
    this._wmapi
    .getService("Journeys/Overview")
    .then((result) => {
      this.journeyList = result;
      this.getFirstJourney(result[0].JourneyId)
    })
    .catch(error => console.log(error));
  }

  // Single Journey From Select
  getJourney(journeyId: any) {
    console.log("Journey ID: " + journeyId);
    this._wmapi
    .getService("Journey/" + journeyId.value)
    .then((result) => {
      this.journeyEdit = result;
      this.JourneyTitle = this.journeyEdit.JourneyTitle;
      this.JourneyCompletionTime = this.journeyEdit.JourneyCompletionTime;
      this.JourneyDescription = this.journeyEdit.JourneyDescription;
      this.JourneyGains = this.journeyEdit.JourneyGains;
      this.JourneyIntroVideo = this.journeyEdit.JourneyIntroVideo;
      this.JourneyRewards = this.journeyEdit.JourneyRewards;
      this.JourneyTitle = this.journeyEdit.JourneyTitle;
      this.XpReward = this.journeyEdit.XpReward;
    })
    .catch(error => console.log(error));
  }

  // Single Journey From Select
  getFirstJourney(journeyId: any) {
    this._wmapi
    .getService("Journey/" + journeyId)
    .then((result) => {
      this.journeyEdit = result;
      this.JourneyTitle = this.journeyEdit.JourneyTitle;
      this.JourneyCompletionTime = this.journeyEdit.JourneyCompletionTime;
      this.JourneyDescription = this.journeyEdit.JourneyDescription;
      this.JourneyGains = this.journeyEdit.JourneyGains;
      this.JourneyIntroVideo = this.journeyEdit.JourneyIntroVideo;
      this.JourneyRewards = this.journeyEdit.JourneyRewards;
      this.JourneyTitle = this.journeyEdit.JourneyTitle;
      this.XpReward = this.journeyEdit.XpReward;
    })
    .catch(error => console.log(error));
  }

  // Edit Journey in Data
  editJourney() {
    // Make a new journey
    class newJourney {
      JourneyTitle: string;
      JourneyDescription: string;
      JourneyIntroVideo: string;
      JourneyRewards: string;
      JourneyGains: string;
      JourneyCompletionTime: string;
      XpReward: number;
      JourneyId: any;
    }
    let j = new newJourney();
    j.JourneyId = this.journeyEdit.JourneyId;
    j.JourneyCompletionTime = this.JourneyCompletionTime;
    j.JourneyDescription = this.JourneyDescription;
    j.JourneyGains = this.JourneyGains;
    j.JourneyIntroVideo = this.JourneyIntroVideo;
    j.JourneyRewards = this.JourneyRewards;
    j.JourneyTitle = this.JourneyTitle;
    j.XpReward = this.XpReward;
    this._wmapi
    .postService("Journey/Edit", j)
    .then((result) => {
      // Success Feedback
      this.journeySuccess = true;
    })
    .catch(error => console.log(error));
  }

}
