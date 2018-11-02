using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using wm_api.Models;

namespace wm_api.Controllers
{
    public class QuizQuestionAnswersController : ApiController
    {
        WmDataContext WmData = new WmDataContext();
        _Utils Util = new _Utils();

        #region Classes
        public class newAnswer
        {
            public string QuestionId { get; set; }
            public string Answer { get; set; }
            public string AnswerAdvice { get; set; }
            public string CorrectAnswer { get; set; }
            public string AnswerId { get; set; }
        }
        #endregion

        #region GetAnswers
        // Get an Overview of all answers for one question
        [Route("Quiz/Question/Answers/{questionId}")]
        [HttpGet]
        public IHttpActionResult GetQuizQuestionsAnswersByQuestionId(string questionId)
        {
            // Check we have an ID and make a GUID
            if (String.IsNullOrEmpty(questionId)) return NotFound();
            Guid QuestionGuid = new Guid(questionId);

            // If we do then lets find the answers
            List<QuestionAnswer> Answers = WmData.QuestionAnswers.Where(q => q.QuestionId == QuestionGuid).ToList();

            // Shuffle the answers so users can't learn the order
            Util.Shuffle(Answers);

            // If we find an answer set then lets return it
            if (Answers != null) return Ok(Answers); else return NotFound();
        }
        #endregion

        #region PostAnswers
        // Add answers to question
        [Route("Quiz/Questions/Answers/Add")]
        [HttpPost]
        public IHttpActionResult AddAnswers([FromBody] List<newAnswer> Answers)
        {
            // Make sure we have data from the body
            if (Answers is null) return NotFound();

            // Convert each question and add to data
            foreach (var a in Answers)
            {
                // Generate New Question
                var NewAnswer = new QuestionAnswer();
                NewAnswer.QuestionAnswerId = Guid.NewGuid();
                NewAnswer.QuestionId = new Guid(a.QuestionId);
                NewAnswer.Answer = a.Answer;
                NewAnswer.AnswerAdvice = a.AnswerAdvice;
                NewAnswer.CorrectAnswer = a.CorrectAnswer;
                // Add to database
                WmData.QuestionAnswers.Add(NewAnswer);
            }

            // Commit Changes to the Database
            WmData.SaveChanges();

            // If we have Questions then return them, if not return Not Found
            return Ok("Answers Added");
        }
        #endregion
    }
}
