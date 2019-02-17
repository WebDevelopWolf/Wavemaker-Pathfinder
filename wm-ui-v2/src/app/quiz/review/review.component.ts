import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WmApiService } from '../../services/wm-api.service';
import { BadgeService } from '../../services/badge-service.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  constructor(private _wmapi: WmApiService, private route: ActivatedRoute, private _badge: BadgeService, private router: Router) { }

  result: any;
  id: string;
  private sub: any;
  passed: boolean;
  user: any;
  loggedIn: boolean;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.loggedIn = (this.user != null);
    if (this.loggedIn) {
      this.getResult();
    } else {
      this.router.navigateByUrl('login');
    }
  }

  getResult() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; 
      this._wmapi
      .getService("Quiz/Review/" + this.id + "/" + this.user.match(/\(([^)]+)\)/)[1])
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
