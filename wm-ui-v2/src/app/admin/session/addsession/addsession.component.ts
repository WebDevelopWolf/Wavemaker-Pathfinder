import { Component, OnInit } from '@angular/core';
import { WmApiService } from '../../../services/wm-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addsession',
  templateUrl: './addsession.component.html',
  styleUrls: ['./addsession.component.css']
})
export class AddsessionComponent implements OnInit {

  constructor(private _wmapi: WmApiService, private router: Router) { }

  SessionCompletionTime: number;
  SessionDescription: string;
  SessionGains: string;
  SessionVideo: string;
  SessionReward: string;
  SessionTitle: string;
  SessionXpReward: string;
  SessionOrder: string;
  TopicId: string;
  LevelId: string;
  sessionSuccess: boolean;
  sessionLevelSuccess: boolean;
  topics: any;
  levels: any;
  topicFeedback: string;
  levelFeedback: string;
  user: any;
  loggedIn: boolean;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.loggedIn = (this.user != null);
    if (!this.loggedIn 
      && (this.getUserType(this.user.email) != "SuperUser" 
      || this.getUserType(this.user.email) != "Teacher")) {    
      this.router.navigateByUrl('login');
    } else {
      this.sessionSuccess = false;
      this.sessionLevelSuccess = false;
      this.loadTopics();
      this.topicFeedback = "Which Topic is this Session for?";
      this.levelFeedback = "And which Level?";
    }
  }

  getUserType(email: string): string {
    // Make a new JS User Email Class
    let userType: string;
    class userEmail {
      Email: string;
    }
    // Populate JS Topic
    let u = new userEmail();
    u.Email = email;
    // Send JS topic to API
    this._wmapi
    .postService("User/Type", u)
    .then((result) => {
      userType = result;
    })
    .catch(error => console.log(error));
    return userType;
  }

  // Get Topics and ID's
  loadTopics() {
    this._wmapi
    .getService("Topics/Overview")
    .then((result) => {
      // Push the user to UI
      this.topics = result;
    })
    .catch(error => console.log(error));
  }

  // Get Levels and ID's based on topic selection
  loadLevels(topicid: string) {
    this._wmapi
    .getService("Topic/Levels/" + topicid)
    .then((result) => {
      // Push the user to UI
      this.levels = result;
    })
    .catch(error => console.log(error));
  }

  // Topic select
  topicSelect(id: string, title: string) {
    this.TopicId = id;
    this.loadLevels(id);
    this.sessionLevelSuccess = true;
    this.topicFeedback = title;
  }

  // Level select
  levelSelect(id: string, title: string) {
    this.LevelId = id;
    this.levelFeedback = title;
  }

  // Add a new Session
  addSession() {
    // Make a new JS Session
    class newSession {
      SessionCompletionTime: number;
      SessionDescription: string;
      SessionGains: string;
      SessionVideo: string;
      SessionReward: string;
      SessionTitle: string;
      SessionXpReward: string;
      SessionOrder: string;
      TopicId: string;
      LevelId: string;
      SessionId: any;
    }

    // Populate JS Session
    let s = new newSession();
    s.SessionCompletionTime = this.SessionCompletionTime;
    s.SessionDescription = this.SessionDescription;
    s.SessionGains = this.SessionGains;
    s.SessionVideo = this.SessionVideo;
    s.SessionReward = this.SessionReward;
    s.SessionTitle = this.SessionTitle;
    s.SessionXpReward = this.SessionXpReward;
    s.TopicId = this.TopicId;
    s.LevelId = this.LevelId;
    s.SessionOrder = this.SessionOrder;

    // Send JS topic to API
    this._wmapi
    .postService("Session/Add", s)
    .then((result) => {
      // Reset the Add Topic form
      this.SessionTitle = null;
      this.SessionDescription = null;
      this.SessionVideo = null;
      this.SessionReward = null;
      this.SessionGains = null;
      this.SessionCompletionTime = null;
      this.SessionXpReward = null;
      this.SessionOrder = null;
      this.sessionSuccess = true;
      this.topicFeedback = "Which Topic is this Session for?";
      this.levelFeedback = "And which Level?";
    })
    .catch(error => console.log(error));
  }

}
