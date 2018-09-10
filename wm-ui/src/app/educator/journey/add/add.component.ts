import { Component, OnInit } from '@angular/core';
import { WmApiService } from '../../../wm-api.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  JourneyTitle: string;
  JourneyDescription: string;
  JourneyIntroVideo: string;
  JourneyRewards: string;
  JourneyGains: string;
  JourneyCompletionTime: string;
  XpReward: number;
  journeySuccess: boolean;

  constructor(private _wmapi: WmApiService) { }

  ngOnInit() {
    this.journeySuccess = false;
  }

  // Add a new Journey
  addJourney() {
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
    j.JourneyCompletionTime = this.JourneyCompletionTime;
    j.JourneyDescription = this.JourneyDescription;
    j.JourneyGains = this.JourneyGains;
    j.JourneyIntroVideo = this.JourneyIntroVideo;
    j.JourneyRewards = this.JourneyRewards;
    j.JourneyTitle = this.JourneyTitle;
    j.XpReward = this.XpReward;
    this._wmapi
    .postService("Journey/Add", j)
    .then((result) => {
      // Reset the form
      this.JourneyTitle = null;
      this.JourneyDescription = null;
      this.JourneyIntroVideo = null;
      this.JourneyRewards = null;
      this.JourneyGains = null;
      this.JourneyCompletionTime = null;
      this.XpReward = null;
      this.journeySuccess = true;
    })
    .catch(error => console.log(error));
  }

}
