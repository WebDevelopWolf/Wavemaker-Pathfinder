using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using wm_api.Models;

namespace wm_api.Controllers
{
    public class QuizController : ApiController
    {
        WmDataContext WmData = new WmDataContext();

        #region Classes
        public class NewQuiz
        {
            public string SessionId { get; set; }
            public string QuizTitle { get; set; }
            public string QuizInstructions { get; set; }
            public Int32 QuizPassMark { get; set; }
            public string QuizTest { get; set; }
            public string QuizId { get; set; }
        }
        #endregion

        #region GetQuiz
        // Get an Overview of all Journeys
        [Route("Quiz/{quizID}")]
        [HttpGet]
        public IHttpActionResult GetQuizById(string quizId)
        {
            // Check we have an ID and make a GUID
            if (String.IsNullOrEmpty(quizId)) return NotFound();
            Guid QuizGuid = new Guid(quizId);

            // If we do then lets find the quiz
            Quizze Quiz = WmData.Quizzes.FirstOrDefault(q => q.QuizId == QuizGuid);

            // If we find a quiz then lets return it
            if (Quiz != null) return Ok(Quiz); else return NotFound();
        }
        #endregion

        #region PostQuiz
        // Add Quiz to Data
        [Route("Quiz/Add")]
        [HttpPost]
        public IHttpActionResult AddQuiz([FromBody] NewQuiz newQuiz)
        {
            if (newQuiz is null) return NotFound();

            // Generate Quiz
            var NewQuiz = new Quizze();
            NewQuiz.QuizId = Guid.NewGuid();
            NewQuiz.SessionId = new Guid(newQuiz.SessionId);
            NewQuiz.QuizTitle = newQuiz.QuizTitle;
            NewQuiz.QuizInstructions = newQuiz.QuizInstructions;
            NewQuiz.QuizPassMark = newQuiz.QuizPassMark;
            NewQuiz.QuizTest = newQuiz.QuizTest;

            // Add to database
            WmData.Quizzes.Add(NewQuiz);
            WmData.SaveChanges();

            // Return the new QuizId
            return Ok(NewQuiz.QuizId);
        }
        #endregion
    }
}
