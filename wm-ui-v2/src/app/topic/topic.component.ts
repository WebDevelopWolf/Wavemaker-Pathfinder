import { Component, OnInit } from '@angular/core';
import { WmApiService } from '../services/wm-api.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  constructor(private _wmapi: WmApiService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  id: number;
  private sub: any;
  topic: any;
  userSignedToJourney: boolean;
  lessons: any;
  relatedJourney: any;
  vidUrl: any;
  usersOnJourney: any;

  ngOnInit() {
    this.getTopic();
  }

  // Get Topic Details
  getTopic() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; 
      this._wmapi
      .getService("Topic/" + this.id)
      .then((result) => {
        this.topic = result;
        //this.userRegisteredToJourney();
        this.vidUrl = this.sanitizer.bypassSecurityTrustResourceUrl(result.TopicVideo);
      })
      .catch(error => console.log(error));
    });
  }

}
