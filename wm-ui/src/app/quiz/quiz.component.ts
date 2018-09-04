import { Component, OnInit } from '@angular/core';
import { WmApiService } from '../wm-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(private _wmapi: WmApiService, private route: ActivatedRoute) { }

  id: string;
  private sub: any;
  quiz: any;
  test: boolean;
  firstQuestion: any;

  ngOnInit() {
    this.getQuiz();
  }

  // Get Quiz Summary Details
  getQuiz() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; 
      this._wmapi
      .getService("Quiz/" + this.id)
      .then((result) => {
        this.quiz = result;
        // Check if quiz is a test
        if (result.QuizTest == "N") {
          this.test = false;
        } else if (result.QuizTest == "N") {
          this.test = true;
        }
      })
      .catch(error => console.log(error));
    });
  }

}
