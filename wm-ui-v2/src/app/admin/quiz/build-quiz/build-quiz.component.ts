import { Component, OnInit } from '@angular/core';
import { WmApiService } from '../../../services/wm-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-build-quiz',
  templateUrl: './build-quiz.component.html',
  styleUrls: ['./build-quiz.component.css']
})
export class BuildQuizComponent implements OnInit {

  quizSuccess: boolean;
  showQuiz: boolean;
  showQuestions: boolean;
  showAnswers: boolean;
  topicFeedback: string;
  topics: any;
  sessionLevelSuccess: boolean;
  levelFeedback: string;
  levels: any;
  sessionSuccess: boolean;
  sessionFeedback: string;
  sessions: any;
  QuizId: string;
  QuizTitle: string;
  QuizInstructions: string;
  QuizPassMark: number;
  QuizTest: string;
  testFeedback: string;
  TopicId: string;
  LevelId: string;
  SessionId: string;
  ScoreSoFar: number;
  QuestionId: string;
  QuestionText: string;
  QuestionValue: number;
  Questions: any = [];
  QuestionsReturned: any = [];
  questionFeedback: string;
  answerFeedback: string;
  NoOfAnswers: number;
  Answers: any = [];
  CorrectAnswer: string;
  Answer: string;
  AnswerAdvice: string;
  user: any;
  loggedIn: boolean;

  constructor(private _wmapi: WmApiService, private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.loggedIn = (this.user != null);
    if (!this.loggedIn 
      && (this.getUserType(this.user.email) != "SuperUser" 
      || this.getUserType(this.user.email) != "Teacher")) {    
      this.router.navigateByUrl('login');
    } else {
      this.initializeQuizBuild();
    this.loadTopics();
    } 
  }

  getUserType(email: string): string {
    // Make a new JS User Email Class
    let userType: string;
    class userEmail {
      Email: string;
    }
    // Populate JS Topic
    let u = new userEmail();
    u.Email = email;
    // Send JS topic to API
    this._wmapi
    .postService("User/Type", u)
    .then((result) => {
      userType = result;
    })
    .catch(error => console.log(error));
    return userType;
  }

  // 00 - Set / Reset the Quiz Builder
  initializeQuizBuild() {
    // Show/Hide Panels & and Cascading Dropdowns 
    this.quizSuccess = false;
    this.showQuiz = true;
    this.showQuestions = false;
    this.showAnswers = false;
    this.sessionLevelSuccess = false;
    this.sessionSuccess = false;
    // Set Inital Dropdown Text
    this.topicFeedback = "Which Topic is this Quiz for?";
    this.levelFeedback = "And which Level?";
    this.sessionFeedback = "And, finally which Session?";
    this.testFeedback = "Is this Quiz going to be sat under Exam Conditions?";
    this.questionFeedback = "Select a Question to Answer...";
    this.answerFeedback = "Is this the correct answer?";
    // Clear the Form 
    this.QuizTitle = null;
    this.QuizInstructions = null;
    this.QuizPassMark = null;
    this.TopicId = null;
    this.LevelId = null;
    this.SessionId = null;
    this.ScoreSoFar = 0;
    this.QuestionText = null;
    this.QuestionValue = null;
    this.NoOfAnswers = 0;
  }

  // 01 - Fill Dropdowns
  // Get Topics and ID's
  loadTopics() {
    this._wmapi
    .getService("Topics/Overview")
    .then((result) => {
      // Push the user to UI
      this.topics = result;
    })
    .catch(error => console.log(error));
  }
  // Get Levels and ID's based on topic selection
  loadLevels(topicid: string) {
    this._wmapi
    .getService("Topic/Levels/" + topicid)
    .then((result) => {
      // Push the user to UI
      this.levels = result;
    })
    .catch(error => console.log(error));
  }
  // Get Sessions and ID's based on level selection
  loadSessions(levelId: string) {
    this._wmapi
    .getService("Level/Sessions/" + levelId)
    .then((result) => {
      // Push the user to UI
      this.sessions = result;
    })
    .catch(error => console.log(error));
  }

  // 02 - Select From Dropdowns
  // Topic select
  topicSelect(id: string, title: string) {
    this.TopicId = id;
    this.loadLevels(id);
    this.topicFeedback = title;
    this.sessionLevelSuccess = true;
  }
  // Level select
  levelSelect(id: string, title: string) {
    this.LevelId = id;
    this.loadSessions(id);
    this.levelFeedback = title;
    this.sessionSuccess = true;
  }
  // Session select
  sessionSelect(id: string, title: string) {
    this.SessionId = id;
    this.sessionFeedback = title;
  }
  // Test select
  testSelect(title: string) {
    this.QuizTest = title;
    this.testFeedback = title;
  }
  // Take the Question ID from the Question Select
  setQuestionId(questionId: string, questionText: string) {
    this.QuestionId = questionId;
    this.questionFeedback = questionText;
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
  setAnswerCorrect(correct: string) {
    this.answerFeedback = correct;
    this.CorrectAnswer = correct;
  }

  // 03 - Add to WMData
  // Add the Quiz to new class
  addQuiz() {
    // Make a new quiz
    class newQuiz {
      SessionId: string;
      QuizTitle: string;
      QuizInstructions: string;
      QuizPassMark: number;
      QuizTest: string;
      QuizId: any;
    }
    let q = new newQuiz();
    // Fill Temp Quiz Class
    q.SessionId = this.SessionId;
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
    this.QuestionText = null;
    this.QuestionValue = null;
    this.questionFeedback = "Select a Question to Answer...";
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
    this.questionFeedback = "Select a Question to Answer...";
    this.answerFeedback = "Is this the correct answer?";
    // Reset the Answer Form
    this.Answer = null;
    this.AnswerAdvice = null;
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
