import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WmApiService } from '../../services/wm-api.service';
import { BadgeService } from '../../services/badge-service.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  constructor(private _wmapi: WmApiService, private route: ActivatedRoute, private _badge: BadgeService) { }

  result: any;
  id: string;
  private sub: any;
  passed: boolean;

  ngOnInit() {
    this.getResult();
  }

  getResult() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; 
      this._wmapi
      .getService("Quiz/Review/" + this.id + "/" + this._wmapi.tempuser)
      .then((result) => {
        this.result = result;
        if (this.result.QuizResultPass == "P") {
          this.passed = true;
          this._badge.rewardBadge("Test badge text");
        } else {
          this.passed = false;
        }
      })
      .catch(error => console.log(error));
    });
  }

}
