using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using wm_api.Models;

namespace wm_api.Controllers
{
    public class JourneyController : ApiController
    {
        WmDataContext WmData = new WmDataContext();

        // Get Single User by Username
        [Route("Journeys/Overview")]
        [HttpGet]
        public IHttpActionResult GetJourneysOverview()
        {
            // Get Journeys Overview and order by the titles
            List<JourneysOverview> Journeys = WmData.JourneysOverviews.OrderBy(j => j.JourneyTitle).ToList();

            // Return the overviews if found, if not return not found
            if (Journeys is null || Journeys.Count <= 0) return NotFound(); else return Ok(Journeys);
        }
    }
}
