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
            if (String.IsNullOrEmpty(journeyId)) return NotFound();

            // If we have a guid then find the journey
            Journey journey = WmData.Journeys.FirstOrDefault(j => j.JourneyId == guid);

            // If that returns a journey then return to application
            if (journey is null) return NotFound(); else return Ok(journey);
        }

        // Add user to journey
        [Route("Journey/Signon/{journeyId}/{user}")]
        [HttpGet]
        public IHttpActionResult SignUserToJourney(string journeyId, string user)
        {
            // Make a new guid
            Guid JourneyGuid = new Guid(journeyId);

            // Make sure we have a guid and a user
            if (JourneyGuid == null || String.IsNullOrEmpty(user)) return NotFound();

            // If we do then get the user guid
            User UserDb = WmData.Users.FirstOrDefault(u => u.Username == user);

            // Check we've got a user and if we have get the GUID
            if (UserDb == null) return NotFound();

            // Sign the user onto the journey
            UserJourney UserToJourney = new UserJourney();
            UserToJourney.UserJourneyId = Guid.NewGuid();
            UserToJourney.UserId = UserDb.UserId;
            UserToJourney.JourneyId = JourneyGuid;
            UserToJourney.LessonProgressId = Guid.NewGuid();
            WmData.UserJourneys.Add(UserToJourney);
            WmData.SaveChanges();

            // Tell the app this completed ok
            return Ok("User assigned to Journey");
        }

        // Check if trailblazer is on journey
        [Route("Journey/TrailblazerRegistered/{journeyId}/{username}")]
        [HttpGet]
        public IHttpActionResult IsTrailblazerRegistered(string journeyId, string username)
        {
            // First we assume the user is not registered
            int UserRegistered = 0;

            // Make sure we have a guid and a user
            if (String.IsNullOrEmpty(journeyId) || String.IsNullOrEmpty(username)) return NotFound();

            // If we do then get the user guid
            User UserDb = WmData.Users.FirstOrDefault(u => u.Username == username);

            // Check we've got a user and if we have get the GUIDs
            if (UserDb == null) return NotFound();
            Guid UserGuid = UserDb.UserId;
            Guid JourneyGuid = new Guid(journeyId);

            // List of Trailblazers for this Journey
            List<UserJourney> Trailblazers = WmData.UserJourneys.Where(j => j.JourneyId == JourneyGuid).ToList();

            // See if we can find our user in that list
            UserJourney RegisteredUser = Trailblazers.Find(u => u.UserId == UserGuid);

            // Did we find a user?
            if (RegisteredUser != null) UserRegistered = 1;

            // Return true / false
            return Ok(UserRegistered);
        }
    }
}
