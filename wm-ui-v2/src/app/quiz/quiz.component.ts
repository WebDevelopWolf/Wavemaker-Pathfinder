import { Component, OnInit } from '@angular/core';
import { WmApiService } from '../services/wm-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(private _wmapi: WmApiService, private route: ActivatedRoute, private router: Router) { }

  id: string;
  private sub: any;
  quiz: any;
  test: boolean;
  firstQuestion: any;
  user: any;
  loggedIn: any;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.loggedIn = (this.user != null);
    if (this.loggedIn) {
      this.getQuiz();
    } else {
      this.router.navigateByUrl('login');
    }  
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
