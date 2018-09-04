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

        // Get an Overview of all Journeys
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
    }
}
