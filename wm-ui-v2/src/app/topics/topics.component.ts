import { Component, OnInit } from '@angular/core';
import { WmApiService } from '../services/wm-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

  constructor(private _wmapi: WmApiService, private router: Router) { }

  topics: any;
  user: any;
  loggedIn: boolean;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.loggedIn = (this.user != null);
    if (this.loggedIn) {
      this.loadTopics();
    } else {
      this.router.navigateByUrl('login');
    }
  }

  loadTopics() {
    this._wmapi
    .getService("Topics/Overview")
    .then((result) => {
      // Push the user to UI
      this.topics = result;
    })
    .catch(error => console.log(error));
  }

}
