using wm_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace wm_api.Controllers
{
    public class XpLevelsController : ApiController
    {
        WmDataContext WmData = new WmDataContext();

        // Get the XP details for level
        [Route("Level/{level}")]
        [HttpGet]
        public IHttpActionResult GetNextLevelDetails(int level)
        {
            // If the level is 0 then return not found 
            if (level == 0) return NotFound();

            // Get the level details
            var Lvl = WmData.XpLevels.FirstOrDefault(l => l.UserLevel == (level));

            // Check if level has been found and if so return it
            if (Lvl is null) return NotFound(); else return Ok(Lvl);
        }
    }
}
