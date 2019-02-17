import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WmApiService } from '../../services/wm-api.service';

@Component({
  selector: 'app-user-draw',
  templateUrl: './user-draw.component.html',
  styleUrls: ['./user-draw.component.css']
})
export class UserDrawComponent implements OnInit {

  constructor(private router: Router, private _wmapi: WmApiService) { }

  user: any;
  loggedIn: boolean;
  userProfile: any;
  userAvatar: string;
  xpCalc: any;
  leaderboardPos: any;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.loggedIn = (this.user != null);
    if (this.loggedIn) {
      this.getUserProfile(this.user);
    } else {
      this.router.navigateByUrl('login');
    }
  }

  // Fill the user profile information
  getUserProfile(user: any) {
    console.log("Logged in user: " + user.name.match(/\(([^)]+)\)/)[1]);
    this._wmapi
    .getService("User/" + user.name.match(/\(([^)]+)\)/)[1])
    .then((result) => {
      // Calculate the user XP
      this.calculateXP(result.UserLevel, result.UserXp);
      // Push the user to UI
      this.getGlobalLeaderboardPos(result.Username);
      this.userProfile = result;
      // Set the user avatar
      this.userAvatar = user.photoUrl; 
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
