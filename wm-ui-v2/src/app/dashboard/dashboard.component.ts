import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { WmApiService } from '../services/wm-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // TODO: Add Cookie Warning!

  hideOverlay = true;
  userProfile: any;
  userAvatar: string;
  xpCalc: number;
  leaderboardPos: any;

  constructor(private _wmapi: WmApiService) { }

  ngOnInit() {
    this.getUserProfile();
  }

  // Listen for the escape key
  @HostListener('document:keydown.escape', ['$event']) handleKeyboardEvent(event: KeyboardEvent) {
    // Hide the overlay if it's already showing
    if (!this.hideOverlay) {
      this.hideOverlay = true;
    }
  }

   // Fill the user profile information
   getUserProfile() {
    console.log("Logged in user:" + this._wmapi.tempuser);
    this._wmapi
    .getService("User/" + this._wmapi.tempuser)
    .then((result) => {
      // Calculate the user XP
      this.calculateXP(result.UserLevel, result.UserXp);
      // Push the user to UI
      this.getGlobalLeaderboardPos(result.Username);
      this.userProfile = result;
      // Set the user avatar
      this.userAvatar = this._wmapi.tempuseravatar; 
    })
    .catch(error => console.log(error));
  }

  // Calculate XP Percent for progres bar
  calculateXP(level: number, userxp: number) {
    this._wmapi
    .getService("Level/" + (level + 1))
    .then((result) => {
      this.xpCalc = (userxp / result.UserXp) * 100;
    })
    .catch(error => console.log(error)); 
  }

  // Get Users Leaderboard Position
  getGlobalLeaderboardPos(username: string) {
    this._wmapi
    .getService("User/Leaderboard/Position/" + username)
    .then((result) => {
      this.leaderboardPos = result;
    })
    .catch(error => console.log(error)); 
  }

}
