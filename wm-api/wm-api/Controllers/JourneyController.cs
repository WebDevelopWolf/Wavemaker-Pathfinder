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

        // Get an Overview of all Journeys
        [Route("Journeys/Overview")]
        [HttpGet]
        public IHttpActionResult GetJourneysOverview()
        {
            // Get Journeys Overview and order by the titles
            List<JourneysOverview> Journeys = WmData.JourneysOverviews.OrderBy(j => j.JourneyTitle).ToList();

            // Return the overviews if found, if not return not found
            if (Journeys is null || Journeys.Count <= 0) return NotFound(); else return Ok(Journeys);
        }

        // Get a single journey
        [Route("Journey/{journeyId}")]
        [HttpGet]
        public IHttpActionResult GetJourney(string journeyId)
        {
            // Make a new guid
            Guid guid = new Guid(journeyId);
            
            // Make sure we have a guid
            if (journeyId == null) return NotFound();

            // If we have a guid then find the journey
            Journey journey = WmData.Journeys.FirstOrDefault(j => j.JourneyId == guid);

            // If that returns a journey then return to application
            if (journey is null) return NotFound(); else return Ok(journey);
        }
    }
}
