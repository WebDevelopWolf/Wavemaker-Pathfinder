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
        #endregion
    }
}
