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

        #region Classes
        public class NewJourney
        {
            public string JourneyTitle { get; set; }
            public string JourneyDescription { get; set; }
            public string JourneyIntroVideo { get; set; }
            public string JourneyRewards { get; set; }
            public string JourneyGains { get; set; }
            public string JourneyCompletionTime { get; set; }
            public Int32 XpReward { get; set; }
            public string JourneyId { get; set; }
        }
        #endregion

        #region PostJourneys
        // Add a new Journey
        [Route("Journey/Add")]
        [HttpPost]
        public IHttpActionResult AddJourney([FromBody] NewJourney newJourney)
        {
            if (newJourney is null) return NotFound();

            // Generate Journey & Add to database
            var NewJourney = new Journey();
            NewJourney.JourneyId = Guid.NewGuid();
            NewJourney.JourneyCompletionTime = newJourney.JourneyCompletionTime;
            NewJourney.JourneyDescription = newJourney.JourneyDescription;
            NewJourney.JourneyGains = newJourney.JourneyGains;
            NewJourney.JourneyRewards = newJourney.JourneyRewards;
            NewJourney.JourneyTitle = newJourney.JourneyTitle;
            NewJourney.JourneyVideo = newJourney.JourneyIntroVideo;
            NewJourney.XpReward = newJourney.XpReward;

            // Add to database
            WmData.Journeys.Add(NewJourney);
            WmData.SaveChanges();

            // Return success message
            return Ok("Journey Added");
        }

        // Edit a Journey
        // Add a new Journey
        [Route("Journey/Edit")]
        [HttpPost]
        public IHttpActionResult EditJourney([FromBody] NewJourney newJourney)
        {
            if (newJourney is null) return NotFound();

            // Generate Journey & Add to database
            Guid NewGuid = new Guid(newJourney.JourneyId);
            var NewJourney = WmData.Journeys.FirstOrDefault(j => j.JourneyId == NewGuid);
            NewJourney.JourneyCompletionTime = newJourney.JourneyCompletionTime;
            NewJourney.JourneyDescription = newJourney.JourneyDescription;
            NewJourney.JourneyGains = newJourney.JourneyGains;
            NewJourney.JourneyRewards = newJourney.JourneyRewards;
            NewJourney.JourneyTitle = newJourney.JourneyTitle;
            NewJourney.JourneyVideo = newJourney.JourneyIntroVideo;
            NewJourney.XpReward = newJourney.XpReward;

            // Add to database
            WmData.SaveChanges();

            // Return success message
            return Ok("Journey Edited");
        }
        #endregion

        #region GetJourneys
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

        // Get Related Journey
        [Route("Journey/Related/{journeyId}")]
        [HttpGet]
        public IHttpActionResult GetRelatedJourney(string journeyId)
        {
            // Make a new guid
            Guid guid = new Guid(journeyId);
            // Make sure we have a guid
            if (String.IsNullOrEmpty(journeyId)) return NotFound();
            // If we have a guid then find the journey
            Journey journey = WmData.Journeys.FirstOrDefault(j => j.JourneyId == guid);

            // Get the related journey
            Guid RelatedGuid = journey.RelatedJourneyId;
            if (RelatedGuid == null) return NotFound();
            Journey RelatedJourney = WmData.Journeys.FirstOrDefault(j => j.RelatedJourneyId == guid);

            // If that returns a journey then return to application
            if (RelatedJourney is null) return NotFound(); else return Ok(RelatedJourney);
        }
        #endregion

        #region JourneyTrailblazerFunctions
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

        // Add user to journey with ID's
        [Route("Journey/Assign/{journeyId}/{userId}")]
        [HttpGet]
        public IHttpActionResult AssignUserToJourney(string journeyId, string userId)
        {
            // Make a new guid
            Guid JourneyGuid = new Guid(journeyId);
            Guid UserGuid = new Guid(userId);

            // Make sure we have a guid and a user
            if (JourneyGuid == null || UserGuid == null) return NotFound();

            // If we do then make a new UserJourney
            UserJourney UserToJourney = new UserJourney();
            UserToJourney.UserJourneyId = Guid.NewGuid();
            UserToJourney.UserId = UserGuid;
            UserToJourney.JourneyId = JourneyGuid;
            UserToJourney.LessonProgressId = Guid.NewGuid();
            WmData.UserJourneys.Add(UserToJourney);
            WmData.SaveChanges();

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

        // Check if user is on any journey
        [Route("Journey/TrailblazerRegistered/{username}")]
        [HttpGet]
        public IHttpActionResult IsTrailblazerRegisteredAny(string username)
        {
            // First we assume the user is not registered to anything
            int UserRegistered = 0;

            // Make sure we have a user
            if (String.IsNullOrEmpty(username)) return NotFound();

            // If we do then get the user guid
            User UserDb = WmData.Users.FirstOrDefault(u => u.Username == username);

            // Check we've got a user and if we have get the GUIDs
            if (UserDb == null) return NotFound();
            Guid UserGuid = UserDb.UserId;

            // List of Trailblazers for this Journey
            List<UserJourney> Assignments = WmData.UserJourneys.Where(j => j.UserId == UserGuid).ToList();

            // Did we find a user?
            if (Assignments != null) UserRegistered = 1;

            // Return true (1) / false (0)
            return Ok(UserRegistered);
        }

        // Get a list of Trailblazers on Journey
        [Route("Journey/Users/{journeyId}")]
        [HttpGet]
        public IHttpActionResult GetUsersOnJourney (string journeyId)
        {
            // Make a new journey guid
            Guid JourneyGuid = new Guid(journeyId);

            // Make sure we have a journey guid
            if (JourneyGuid == null) return NotFound();

            // Get a list of users
            List<UsersOnJourney> JourneyUsers = WmData.UsersOnJourneys.Where(u => u.JourneyId == JourneyGuid).ToList();

            // If we have users then return them
            if (JourneyUsers != null) return Ok(JourneyUsers); else return NotFound();
        }
        #endregion

    }
}
