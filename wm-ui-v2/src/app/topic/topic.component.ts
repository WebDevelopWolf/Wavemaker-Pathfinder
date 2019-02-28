import { Component, OnInit } from '@angular/core';
import { WmApiService } from '../services/wm-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  constructor(private _wmapi: WmApiService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private router: Router) { }

  id: number;
  private sub: any;
  topic: any;
  userSignedToTopic: boolean;
  sessions: any;
  vidUrl: any;
  usersOnJourney: any;
  user: any;
  loggedIn: boolean;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.loggedIn = (this.user != null);
    if (this.loggedIn) {
      this.getTopic();
      this.getSessions();
      this.userRegisteredToTopic();
    } else {
      this.router.navigateByUrl('login');
    }
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

  getSessions() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; 
      this._wmapi
      .getService("Topic/Sessions/" + this.id)
      .then((result) => {
        this.sessions = result;
      })
      .catch(error => console.log(error));
    });
  }

  // Register User to Topic
  signOnToTopic() {
    this._wmapi
    .getService("Topic/Signon/" + this.id + "/" + this.user.name.match(/\(([^)]+)\)/)[1])
    .then((result) => {
      console.log(this.user.name.match(/\(([^)]+)\)/)[1] + " is registered to topic id " + this.id);
      this.userSignedToTopic = true;
      console.log(this.userSignedToTopic);
    })
    .catch(error => console.log(error));
  }

  // Check if User is already on Topic
  userRegisteredToTopic() {
    this._wmapi
    .getService("Topic/UserRegistered/" + this.id + "/" + this.user.name.match(/\(([^)]+)\)/)[1])
    .then((result) => {
      console.log(result);
      if (result == 1) this.userSignedToTopic = true; else this.userSignedToTopic = false;
      console.log(this.userSignedToTopic);
    })
    .catch(error => console.log(error));
  }

}
