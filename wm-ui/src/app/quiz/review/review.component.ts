import { Component, OnInit } from '@angular/core';
import { WmApiService } from '../../wm-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  constructor(private _wmapi: WmApiService, private route: ActivatedRoute) { }

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
        } else {
          this.passed = false;
        }
      })
      .catch(error => console.log(error));
    });
  }

}