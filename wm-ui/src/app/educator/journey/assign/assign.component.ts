import { Component, OnInit } from '@angular/core';
import { WmApiService } from '../../../wm-api.service';

@Component({
  selector: 'app-assign',
  templateUrl: './assign.component.html',
  styleUrls: ['./assign.component.css']
})
export class AssignComponent implements OnInit {

  journeys: any;
  users: any;
  journey: string;
  user: string;
  success: boolean;

  constructor(private _wmapi: WmApiService) { }

  ngOnInit() {
    this.success = false;
    this.loadJourneys();
    this.loadUsers();
  }

  // Get a list of journeys
  loadJourneys() {
    this._wmapi
    .getService("Journeys/Overview")
    .then((result) => {
      // Push the journeys to UI
      this.journeys = result;
    })
    .catch(error => console.log(error));
  }

  // Get a list of users
  loadUsers() {
    this._wmapi
    .getService("Users")
    .then((result) => {
      // Push the journeys to UI
      this.users = result;
    })
    .catch(error => console.log(error));
  }

  // Select the User
  setUser(value){
    this.user = value.value;
  }

  // Select the journey
  setJourney(value){
    this.journey = value.value;
  }

  // Assign the user to the journey
  assignUser() {
    this._wmapi
    .getService("Journey/Assign/" + this.journey + "/" + this.user)
    .then((result) => {
      // User feedback
      this.success = true;
    })
    .catch(error => console.log(error));
  }

}
