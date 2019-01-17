import { Component, OnInit } from '@angular/core';
import { WmApiService } from '../services/wm-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

  constructor(private _wmapi: WmApiService, private router: ActivatedRoute) { }

  topics: any;

  ngOnInit() {
    this.loadTopics();
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
