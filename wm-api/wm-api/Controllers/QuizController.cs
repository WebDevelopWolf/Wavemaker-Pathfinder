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
    }
}
