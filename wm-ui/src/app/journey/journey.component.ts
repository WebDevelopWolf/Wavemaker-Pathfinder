import { Component, OnInit } from '@angular/core';
import { WmApiService } from '../wm-api.service';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.css']
})
export class JourneyComponent implements OnInit {

  constructor(private _wmapi: WmApiService) { }

  journeys: any;

  ngOnInit() {
    this.loadJourneys();
  }

  loadJourneys() {
    this._wmapi
    .getService("Journeys/Overview")
    .then((result) => {
      console.log(result);
      // Truncate Description Text and add ...
      result.forEach(j => {
        j.JourneyDescription = j.JourneyDescription.substring(0, 75) + "...";
      });
      // Push the user to UI
      this.journeys = result;
      // TODO: Set the Journey Preview Images
      // TODO: Set the Journey Preview Videos
    })
    .catch(error => console.log(error));
  }

}