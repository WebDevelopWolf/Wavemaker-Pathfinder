import { Component, OnInit } from '@angular/core';
import { WmApiService } from '../../../wm-api.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  quizSuccess: boolean;
  showQuiz: boolean;
  showQuestions: boolean;
  showAnswers: boolean;
  QuizTitle: string;
  QuizInstructions: string;
  QuizPassMark: number;
  QuizTest: string;
  quizTestYes: string = "Y";
  quizTestNo: string = "N";

  constructor(private _wmapi: WmApiService) { }

  // Initalise the UI
  ngOnInit() {
    this.showQuiz = true;
    this.showQuestions = false;
    this.showAnswers = false;
  }

  // Set the quiz test value from select
  setQuizTest(test: any) {
    this.QuizTest = test.value;
  }

  // Add the Quiz to new class
  addQuiz() {
    // Make a new quiz
    class newQuiz {
      QuizTitle: string;
      QuizInstructions: string;
      QuizPassMark: number;
      QuizTest: string;
      QuizId: any;
    }
    let q = new newQuiz();
    
    // Fill Temp Quiz Class
    q.QuizTitle = this.QuizTitle;
    q.QuizInstructions = this.QuizInstructions;
    q.QuizPassMark = this.QuizPassMark;
    q.QuizTest = this.QuizTest;

    // Hide Quiz, Show Questions
    this.showQuiz = false;
    this.showQuestions = true;
  }

}
