using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using wm_api.Models;

namespace wm_api.Controllers
{
    public class LevelsController : ApiController
    {
        WmDataContext WmData = new WmDataContext();

        #region GetTopicLevels
        [Route("Topic/Levels/{topicid}")]
        [HttpGet]
        public IHttpActionResult GetLevelsForTopic(string topicid)
        {
            // Get Topic Guid
            Guid TopicGuid = new Guid(topicid);

            // Get all Sessions for a single topic, in correct order
            List<Level> Levels = WmData.Levels.Where(s => s.TopicId == TopicGuid).ToList();

            // If we have Sessions then return them, if not return Not Found
            if (Levels != null) return Ok(Levels); else return NotFound();
        }
        #endregion
    }
}
