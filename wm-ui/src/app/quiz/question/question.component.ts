import { Component, OnInit } from '@angular/core';
import { WmApiService } from '../../wm-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  constructor(private _wmapi: WmApiService, private route: ActivatedRoute, private router: Router) { }

  id: string;
  private sub: any;
  currentQuestionNumber:number;
  noOfQuestions: number;
  currentQuestion: any;
  quizQuestionAnswers: any;
  score: number;
  questions: any;

  ngOnInit() {
    this.getQuizQuestions();
  }

  // Get all the Quiz Questions
  getQuizQuestions() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; 
      this._wmapi
      .getService("Quiz/Questions/" + this.id)
      .then((result) => {
        // Check for questions
        if (!this.questions) {
          this.questions = result;
          this.score = 0;
          this.currentQuestionNumber = 0;
          this.noOfQuestions = this.questions.length;
          this.getQuestion(result);
        } else {
          this.getQuestion(this.questions);
        }
      })
      .catch(error => console.log(error));
    });
  }

  // Get individual question details
  getQuestion(questions: any) {
    // Check if we have questions left 
    if(questions.length >= this.currentQuestionNumber + 1) {
      // Get the next question and answers
      this.currentQuestion = questions[this.currentQuestionNumber];
      this.getQuestionAnswers(this.currentQuestion.QuestionId);
      // Move to the next question ready
      this.currentQuestionNumber++;
    } else {
      this.completeQuiz();
    }    
  }

  // Get the answers to the current question
  getQuestionAnswers(questionId: string) {
    this._wmapi
      .getService("Quiz/Question/Answers/" + questionId)
      .then((result) => {
        this.quizQuestionAnswers = result;
      })
      .catch(error => console.log(error));
  }

  // Answer the question
  answerQuestion(correct: string, score: number) {
    // Check if answer is correct
    if (correct == "Y") {
      // Advise users they are correct
      // Update the score 
      this.updateScore(score);
      // Get the next question
      this.getQuestion(this.questions);
    } else if (correct == "N") {
      // Advise user they are incorrect
      // Get the next question
      this.getQuestion(this.questions);
    }
  }

  // Update score
  updateScore(questionScore: number) {
    this.score = this.score + questionScore;
    console.log(this.score);
    console.log(this.currentQuestionNumber);
  }

  // Push users to the quiz review
  completeQuiz() {
    // Add the users score to the Quiz Results
    this._wmapi
      .getService("Quiz/Review/Add/" + this.id + "/" + this._wmapi.tempuser + "/" + this.score)
      .then((result) => {
        console.log(result);
        // Navigate to review
        this.router.navigate(['/quiz/review/', this.id]);
      })
      .catch(error => console.log(error));
  }

}
