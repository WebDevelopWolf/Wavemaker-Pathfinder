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
  Lessons: any;
  LessonId: string;
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
  QuestionsReturned: any;
  QuestionId: string;
  NoOfAnswers = 0;
  Answer: string;
  AnswerAdvice: string;
  CorrectAnswer: string;
  Answers: any = [];

  constructor(private _wmapi: WmApiService) { }

  // Initalise the UI
  ngOnInit() {
    this.showQuiz = true;
    this.showQuestions = false;
    this.showAnswers = false;
    this.ScoreSoFar = 0;
    this.getLessons();
  }

  // Get Lessons for Lessons Select
  getLessons() {
    this._wmapi
    .getService("Lessons")
    .then((result) => {
      // Push the lessons to the select box
      this.Lessons = result;
    })
    .catch(error => console.log(error));
  }

  // Set the LessonId from select
  setLessonId(lesson: any) {
    this.LessonId = lesson.value;
  }

  // Set the quiz test value from select
  setQuizTest(test: any) {
    this.QuizTest = test.value;
  }

  // Add the Quiz to new class
  addQuiz() {
    // Make a new quiz
    class newQuiz {
      LessonId: string;
      QuizTitle: string;
      QuizInstructions: string;
      QuizPassMark: number;
      QuizTest: string;
      QuizId: any;
    }
    let q = new newQuiz();
    
    // Fill Temp Quiz Class
    q.LessonId = this.LessonId;
    q.QuizTitle = this.QuizTitle;
    q.QuizInstructions = this.QuizInstructions;
    q.QuizPassMark = this.QuizPassMark;
    q.QuizTest = this.QuizTest;

    // Add Quiz to Data
    this._wmapi
    .postService("Quiz/Add", q)
    .then((result) => {
      // Set Quiz Id
      this.QuizId = result;
      // Hide Quiz, Show Questions
      this.showQuiz = false;
      this.showQuestions = true;
    })
    .catch(error => console.log(error));
  }

  // Add the Questions to a New Class
  addQuestion() {
    // Make new Question
    class newQuestion {
      QuizId: string;
      QuestionText: string;
      QuestionValue: number;
      QuestionId: any;
    }
    let qu = new newQuestion();

    // Fill Temp Question Class
    qu.QuizId = this.QuizId;
    qu.QuestionText = this.QuestionText;
    qu.QuestionValue = this.QuestionValue;
    this.Questions.push(qu);

    // Edit UI for new quesion
    this.ScoreSoFar = +this.ScoreSoFar + +this.QuestionValue;
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
      QuestionId: any;
    }
    let qu = new newQuestion();

    // Fill Temp Question Class
    qu.QuizId = this.QuizId;
    qu.QuestionText = this.QuestionText;
    qu.QuestionValue = this.QuestionValue;
    this.Questions.push(qu);

    // Add Questions to Data
    this._wmapi
    .postService("Quiz/Questions/Add", this.Questions)
    .then((result) => {
      // Set Questions with Ids
      this.QuestionsReturned = result;
      // Hide Quiz, Show Questions
      this.showQuestions = false;
      this.showAnswers = true;
    })
    .catch(error => console.log(error));
  }

  // Take the Question ID from the Question Select
  setQuestionId(questionId: any) {
    this.QuestionId = questionId.value;
    this.NoOfAnswers = 0;
    if (this.Answers.length > 0) {
      this.Answers.forEach(a => {
        if (a.QuestionId == this.QuestionId) {
          this.NoOfAnswers++;
        }
      });
    }
  }

  // Take the correct answer marker from the Correct Select
  setAnswerCorrect(correct: any) {
    this.CorrectAnswer = correct.value;
  }

  addAnswers() {
    // Make new Answer
    class newAnswer {
      QuestionId: string;
      Answer: string;
      AnswerAdvice: string;
      CorrectAnswer: string;
      AnswerId: any;
    }
    let a = new newAnswer();

    // Fill Temp Question Class
    a.QuestionId = this.QuestionId;
    a.Answer = this.Answer;
    a.AnswerAdvice = this.AnswerAdvice;
    a.CorrectAnswer = this.CorrectAnswer;
    this.Answers.push(a);
  }

  addAnswersToDb(){
    // Add Answers to Data
    this._wmapi
    .postService("Quiz/Questions/Answers/Add", this.Answers)
    .then((result) => {
      // Hide Answers, Show Quiz and Success Banner
      this.showAnswers = false;
      this.showQuiz = true;
      this.quizSuccess = true; 
      this.Questions = [];
      this.QuestionsReturned = [];
      this.Answers = [];
    })
    .catch(error => console.log(error));
  }

}
