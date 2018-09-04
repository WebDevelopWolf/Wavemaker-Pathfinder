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

        // Get an Overview of all Journeys
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
    }
}
