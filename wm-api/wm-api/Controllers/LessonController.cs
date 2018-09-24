using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using wm_api.Models;

namespace wm_api.Controllers
{
    public class LessonController : ApiController
    {
        WmDataContext WmData = new WmDataContext();

        #region GetLessons
        [Route("Lessons")]
        [HttpGet]
        public IHttpActionResult GetLessons()
        {
            // Get all Lessons from Data
            List<Lesson> Lessons = WmData.Lessons.ToList();

            // If we have Lessons then return them, if not return Not Found
            if (Lessons != null) return Ok(Lessons); else return NotFound();
        }

        [Route("Journey/Lessons/{journeyid}")]
        [HttpGet]
        public IHttpActionResult GetLessonsForJourney(string journeyid)
        {
            // Get Journey Guid
            Guid JourneyGuid = new Guid(journeyid);

            // Get all Lessons from Data
            List<Lesson> Lessons = WmData.Lessons.Where(l => l.JourneyId == JourneyGuid).ToList();

            // If we have Lessons then return them, if not return Not Found
            if (Lessons != null) return Ok(Lessons); else return NotFound();
        }
        #endregion
    }
}
