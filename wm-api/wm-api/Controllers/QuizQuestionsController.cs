using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using wm_api.Models;
using wm_api.Controllers;

namespace wm_api.Controllers
{
    public class QuizQuestionsController : ApiController
    {
        WmDataContext WmData = new WmDataContext();
        _Utils Util = new _Utils();

        #region Classes
        public class Question
        {
           public string QuizId { get; set; }
           public string QuestionText { get; set; }
           public Int32 QuestionValue { get; set; }
           public string QuestionId { get; set; }
        }
        #endregion

        #region GetQuestions
        // Get quiz questions by quiz ID
        [Route("Quiz/Questions/{quizID}")]
        [HttpGet]
        public IHttpActionResult GetQuizQuestionsByQuizId(string quizId)
        {
            // Check we have an ID and make a GUID
            if (String.IsNullOrEmpty(quizId)) return NotFound();
            Guid QuizGuid = new Guid(quizId);

            // If we do then lets find the quiz questions
            List<QuizQuestion> Questions = WmData.QuizQuestions.Where(q => q.QuizId == QuizGuid).ToList();

            // Shuffle the questions so users can't learn the order
            Util.Shuffle(Questions);

            // If we find a question set then lets return it
            if (Questions != null) return Ok(Questions); else return NotFound();
        }
        #endregion

        #region PostQuestions
        // Add Questions to data
        [Route("Quiz/Questions/Add")]
        [HttpPost]
        public IHttpActionResult AddQuestions([FromBody] List<Question> Questions)
        {
            // Make sure we have data from the body
            if (Questions is null) return NotFound();

            // Convert each question and add to data
            foreach (var q in Questions)
            {
                // Generate New Question
                var NewQuestion = new QuizQuestion();
                NewQuestion.QuestionId = Guid.NewGuid();
                NewQuestion.QuizId = new Guid(q.QuizId);
                NewQuestion.QuestionText = q.QuestionText;
                NewQuestion.QuestionScoreValue = q.QuestionValue;
                // Add to database
                WmData.QuizQuestions.Add(NewQuestion);
            }

            // Commit Changes to the Database
            WmData.SaveChanges();

            // Get the newly added Questions
            Guid QuizId = new Guid(Questions[0].QuizId);
            List<QuizQuestion> QuestionsReturn = WmData.QuizQuestions.Where(q => q.QuizId == QuizId).ToList();

            // If we have Questions then return them, if not return Not Found
            if (QuestionsReturn != null || QuestionsReturn.Count > 0) return Ok(QuestionsReturn); else return NotFound();
        }
        #endregion
    }
}
