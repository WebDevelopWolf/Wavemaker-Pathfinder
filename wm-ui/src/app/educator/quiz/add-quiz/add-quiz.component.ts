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
  ScoreSoFar: number;
  QuestionText: string;
  QuestionValue: number;
  QuizId: string;
  Questions: any = [];

  constructor(private _wmapi: WmApiService) { }

  // Initalise the UI
  ngOnInit() {
    this.showQuiz = true;
    this.showQuestions = false;
    this.showAnswers = false;
    this.ScoreSoFar = 0;
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

  // Add the Questions to a New Class
  addQuestion() {
    // Make new Question
    class newQuestion {
      QuizId: string;
      QuestionText: string;
      QuestionValue: number;
    }
    let qu = new newQuestion();

    // Fill Temp Question Class
    qu.QuizId = this.QuizId;
    qu.QuestionText = this.QuestionText;
    qu.QuestionValue = this.QuestionValue;
    this.Questions.push(qu);

    // Edit UI for new quesion
    this.ScoreSoFar = this.ScoreSoFar + this.QuestionValue;
    this.QuestionText = "";
    this.QuestionValue = 0;
  }

  // Add the last Question and move on to answers
  addLastQuestion() {
    // Make new Question
    class newQuestion {
      QuizId: string;
      QuestionText: string;
      QuestionValue: number;
    }
    let qu = new newQuestion();

    // Fill Temp Question Class
    qu.QuizId = this.QuizId;
    qu.QuestionText = this.QuestionText;
    qu.QuestionValue = this.QuestionValue;
    this.Questions.push(qu);

    // Hide Quiz, Show Questions
    this.showQuestions = false;
    this.showAnswers = true;
  }

}
