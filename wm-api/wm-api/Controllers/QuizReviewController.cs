using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using wm_api.Models;

namespace wm_api.Controllers
{
    public class QuizReviewController : ApiController
    {
        WmDataContext WmData = new WmDataContext();

        [Route("Quiz/Review/Add/{quizId}/{username}/{score}")]
        [HttpGet]
        public IHttpActionResult AddQuizResult(string quizId, string username, int score)
        {
            // Check we have all the parameters we need
            if (String.IsNullOrEmpty(quizId) || String.IsNullOrEmpty(username)) return NotFound();

            // We do, cool, lets find the user
            User UserDb = WmData.Users.FirstOrDefault(u => u.Username == username);

            // Right now we've got the user, lets add the result
            QuizResult Result = new QuizResult();
            Guid QuizId = new Guid(quizId);
            if (UserDb != null)
            {
                // Set result values
                Result.QuizId = QuizId;
                Result.QuizResultId = Guid.NewGuid();
                Result.QuizResultScore = score;
                Result.UserId = UserDb.UserId;

                // Check to see if the user passed
                Quizze Quiz = WmData.Quizzes.FirstOrDefault(q => q.QuizId == QuizId);
                if (Quiz.QuizPassMark >= Result.QuizResultScore)
                {
                    Result.QuizResultPass = "P";
                }
                else
                {
                    Result.QuizResultPass = "F";
                }

                // Check to see if we already have a result for this quiz and user
                List<QuizResult> ExistingResults = WmData.QuizResults.Where(q => q.QuizId == QuizId).ToList();
                QuizResult ExisitingResult = ExistingResults.FirstOrDefault(u => u.UserId == UserDb.UserId);
                if (ExisitingResult == null)
                {
                    // As it's the first run through, they can have a badge, yey!
                    var BadgeCrtl = new BadgeController();
                    bool BadgeAwarded = BadgeCrtl.AwardBadgeByType(Quiz.QuizId, "challenge", UserDb.UserId);
                    if (!BadgeAwarded) return NotFound();
                    // Add Result
                    WmData.QuizResults.Add(Result);
                }
                else
                {
                    // Update Result only (no badge for these guys)
                    ExisitingResult.QuizResultScore = score;
                    ExisitingResult.QuizResultPass = Result.QuizResultPass;
                }

                WmData.SaveChanges();
            }
            else
            {
                return NotFound();
            }

            // Added? Right, lets tell the app
            return Ok("Result Added to Trailblazer");
        }

        [Route("Quiz/Review/{quizId}/{username}")]
        [HttpGet]
        public IHttpActionResult GetQuizResult(string quizId, string username)
        {
            // Check we have all the parameters we need
            if (String.IsNullOrEmpty(quizId) || String.IsNullOrEmpty(username)) return NotFound();

            // We do, cool, lets find the user
            User UserDb = WmData.Users.FirstOrDefault(u => u.Username == username);

            // Right lets get the result
            Guid QuizId = new Guid(quizId);
            QuizResult Result = WmData.QuizResults.FirstOrDefault(r => r.QuizId == QuizId && r.UserId == UserDb.UserId);

            // Did we get a result?
            if (Result == null) return NotFound(); else return Ok(Result);
        }
    }
}
