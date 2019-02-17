import { Component, OnInit } from '@angular/core';
import { WmApiService } from '../../../services/wm-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  TopicTitle: string;
  TopicDescription: string;
  TopicIntroVideo: string;
  TopicRewards: string;
  TopicGains: string;
  TopicCompletionTime: string;
  TopicXpReward: number;
  TopicTag: string;
  topicSuccess: boolean;
  user: any;
  loggedIn: boolean;

  constructor(private _wmapi: WmApiService, private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.loggedIn = (this.user != null);
    if (!this.loggedIn 
      && (this.getUserType(this.user.email) != "SuperUser" 
      || this.getUserType(this.user.email) != "Teacher")) {    
      this.router.navigateByUrl('login');
    } else {
      this.topicSuccess = false;
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

  // Add a new Topic
  addTopic() {
    // Make a new JS Topic
    class newTopic {
      TopicTitle: string;
      TopicDescription: string;
      TopicIntroVideo: string;
      TopicRewards: string;
      TopicGains: string;
      TopicCompletionTime: string;
      TopicXpReward: number;
      TopicTag: string;
      TopicPreviewImage: string;
      TopicId: any;
    }

    // Populate JS Topic
    let t = new newTopic();
    t.TopicCompletionTime = this.TopicCompletionTime;
    t.TopicDescription = this.TopicDescription;
    t.TopicGains = this.TopicGains;
    t.TopicIntroVideo = this.TopicIntroVideo;
    t.TopicRewards = this.TopicRewards;
    t.TopicTitle = this.TopicTitle;
    t.TopicXpReward = this.TopicXpReward;
    t.TopicTag = this.TopicTag;

    // Set the preview image
    
    t.TopicPreviewImage = "assets/images/topics/preview/" + this.TopicTitle.split(" ").join("-") + ".png";
    
    // Send JS topic to API
    this._wmapi
    .postService("Topic/Add", t)
    .then((result) => {
      // Reset the Add Topic form
      this.TopicTitle = null;
      this.TopicDescription = null;
      this.TopicIntroVideo = null;
      this.TopicRewards = null;
      this.TopicGains = null;
      this.TopicCompletionTime = null;
      this.TopicXpReward = null;
      this.TopicTag = null;
      this.topicSuccess = true;
    })
    .catch(error => console.log(error));
  }

}
