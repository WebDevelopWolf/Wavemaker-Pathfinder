using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using wm_api.Models;

namespace wm_api.Controllers
{
    public class SessionsController : ApiController
    {
        WmDataContext WmData = new WmDataContext();

        #region Classes
        public class NewSession
        {
            public string SessionTitle { get; set; }
            public string SessionDescription { get; set; }
            public string SessionVideo { get; set; }
            public string SessionReward { get; set; }
            public string SessionGains { get; set; }
            public string SessionCompletionTime { get; set; }
            public Int32 SessionXpReward { get; set; }
            public Int32 SessionOrder { get; set; }
            public string TopicId { get; set; }
            public string LevelId { get; set; }
            public string SessionId { get; set; }
        }
        #endregion

        #region PostTopics
        // Add a new Session
        [Route("Session/Add")]
        [HttpPost]
        public IHttpActionResult AddSession([FromBody] NewSession newSession)
        {
            if (newSession is null) return NotFound();

            // Generate Session & Add to database
            var NewSession = new Session();
            NewSession.SessionId = Guid.NewGuid();
            NewSession.SessionCompletionTime = newSession.SessionCompletionTime;
            NewSession.SessionDescription = newSession.SessionDescription;
            NewSession.SessionGains = newSession.SessionGains;
            NewSession.SessionReward = newSession.SessionReward;
            NewSession.SessionTitle = newSession.SessionTitle;
            NewSession.SessionVideo = newSession.SessionVideo;
            NewSession.SessionXpReward = newSession.SessionXpReward;
            NewSession.TopicId = new Guid(newSession.TopicId);
            NewSession.LevelId = new Guid(newSession.LevelId);
            NewSession.SessionOrder = newSession.SessionOrder;

            // Add to database
            WmData.Sessions.Add(NewSession);
            WmData.SaveChanges();

            // Return success message
            return Ok("Session Added");
        }
        #endregion

        #region GetSessions
        [Route("Sessions")]
        [HttpGet]
        public IHttpActionResult GetSessions()
        {
            // Get all Sessions from Data
            List<Session> Sessions = WmData.Sessions.ToList();

            // If we have Sessions then return them, if not return Not Found
            if (Sessions != null) return Ok(Sessions); else return NotFound();
        }

        [Route("Topic/Sessions/{topicid}")]
        [HttpGet]
        public IHttpActionResult GetSessionsForTopic(string topicid)
        {
            // Get Topic Guid
            Guid TopicGuid = new Guid(topicid);

            // Get all Sessions for a single topic, in correct order
            List<OrderedSessionList> Sessions = WmData.OrderedSessionLists
                .Where(s => s.TopicId == TopicGuid)
                .OrderBy(s => s.SessionOrder)
                .ToList();

            // If we have Sessions then return them, if not return Not Found
            if (Sessions != null) return Ok(Sessions); else return NotFound();
        }

        [Route("Level/Sessions/{levelid}")]
        [HttpGet]
        public IHttpActionResult GetSessionsForLevel(string levelid)
        {
            // Get Topic Guid
            Guid LevelGuid = new Guid(levelid);

            // Get all Sessions for a single topic, in correct order
            List<Session> Sessions = WmData.Sessions
                .Where(s => s.LevelId == LevelGuid)
                .OrderBy(s => s.SessionOrder)
                .ToList();

            // If we have Sessions then return them, if not return Not Found
            if (Sessions != null) return Ok(Sessions); else return NotFound();
        }

        [Route("Session/{sessionid}")]
        [HttpGet]
        public IHttpActionResult GestSessionById(string sessionid)
        {
            // Get Session Guid
            Guid SessionGuid = new Guid(sessionid);

            // Get session details
            Session CurrentSession = WmData.Sessions.FirstOrDefault(s => s.SessionId == SessionGuid);

            // If we have a Session then return it, if not return Not Found
            if (CurrentSession != null) return Ok(CurrentSession); else return NotFound();
        }

        [Route("Session/Resources/{sessionid}")]
        [HttpGet]
        public IHttpActionResult GetResourcesForSession(string sessionid)
        {
            // Get Session Guid
            Guid SessionGuid = new Guid(sessionid);

            // Get all Resources for a single Session
            List<Resource> Resources = WmData.Resources.Where(r => r.SessionId == SessionGuid).ToList();

            // If we have Resources then return them, if not return Not Found
            if (Resources != null || Resources.Count > 0) return Ok(Resources); else return NotFound();
        }

        [Route("Session/Quiz/{sessionid}")]
        [HttpGet]
        public IHttpActionResult GetQuizForSession(string sessionid)
        {
            // Get Session Guid
            Guid SessionGuid = new Guid(sessionid);

            // Get all Resources for a single Session
            Quizze Quiz = WmData.Quizzes.FirstOrDefault(r => r.SessionId == SessionGuid);

            // If we have Resources then return them, if not return Not Found
            if (Quiz != null) return Ok(Quiz); else return NotFound();
        }
        #endregion
    }
}
