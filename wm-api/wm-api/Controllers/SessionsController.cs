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
            // Get Session Guid
            Guid SessionGuid = new Guid(topicid);

            // Get all Sessions for a single topic, in correct order
            List<OrderedSessionList> Sessions = WmData.OrderedSessionLists
                .Where(s => s.TopicId == SessionGuid)
                .OrderBy(s => s.SessionOrder)
                .ToList();

            // If we have Sessions then return them, if not return Not Found
            if (Sessions != null) return Ok(Sessions); else return NotFound();
        }
        #endregion
    }
}
