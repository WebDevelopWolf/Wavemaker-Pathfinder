using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using wm_api.Models;

namespace wm_api.Controllers
{
    public class TopicController : ApiController
    {
        WmDataContext WmData = new WmDataContext();

        #region Classes
        public class NewTopic
        {
            public string TopicTitle { get; set; }
            public string TopicDescription { get; set; }
            public string TopicIntroVideo { get; set; }
            public string TopicRewards { get; set; }
            public string TopicGains { get; set; }
            public string TopicCompletionTime { get; set; }
            public Int32 TopicXpReward { get; set; }
            public string TopicId { get; set; }
        }
        #endregion

        #region PostTopics
        // Add a new Topic
        [Route("Topic/Add")]
        [HttpPost]
        public IHttpActionResult AddTopic([FromBody] NewTopic newTopic)
        {
            if (newTopic is null) return NotFound();

            // Generate Topic & Add to database
            var NewTopic = new Topic();
            NewTopic.TopicId = Guid.NewGuid();
            NewTopic.TopicCompletionTime = newTopic.TopicCompletionTime;
            NewTopic.TopicDescription = newTopic.TopicDescription;
            NewTopic.TopicGains = newTopic.TopicGains;
            NewTopic.TopicRewards = newTopic.TopicRewards;
            NewTopic.TopicTitle = newTopic.TopicTitle;
            NewTopic.TopicVideo = newTopic.TopicIntroVideo;
            NewTopic.TopicXpReward = newTopic.TopicXpReward;

            // Add to database
            WmData.Topics.Add(NewTopic);
            WmData.SaveChanges();

            // Return success message
            return Ok("Topic Added");
        }

        // Edit a Topic
        [Route("Topic/Edit")]
        [HttpPost]
        public IHttpActionResult EditTopic([FromBody] NewTopic newTopic)
        {
            if (newTopic is null) return NotFound();

            // Generate Topic & Add to database
            Guid NewGuid = new Guid(newTopic.TopicId);
            var NewTopic = WmData.Topics.FirstOrDefault(t => t.TopicId == NewGuid);
            NewTopic.TopicCompletionTime = newTopic.TopicCompletionTime;
            NewTopic.TopicDescription = newTopic.TopicDescription;
            NewTopic.TopicGains = newTopic.TopicGains;
            NewTopic.TopicRewards = newTopic.TopicRewards;
            NewTopic.TopicTitle = newTopic.TopicTitle;
            NewTopic.TopicVideo = newTopic.TopicIntroVideo;
            NewTopic.TopicXpReward = newTopic.TopicXpReward;

            // Add to database
            WmData.SaveChanges();

            // Return success message
            return Ok("Topic Edited");
        }
        #endregion

        #region GetTopics
        // Get an Overview of all Journeys
        [Route("Topics/Overview")]
        [HttpGet]
        public IHttpActionResult GetTopicsOverview()
        {
            // Get Journeys Overview and order by the titles
            List<TopicsOverview> Topics = WmData.TopicsOverviews.OrderBy(t => t.TopicTitle).ToList();

            // Return the overviews if found, if not return not found
            if (Topics is null || Topics.Count <= 0) return NotFound(); else return Ok(Topics);
        }

        // Get a single journey
        [Route("Topic/{topicId}")]
        [HttpGet]
        public IHttpActionResult GetTopic(string topicId)
        {
            // Make sure we have a guid
            if (String.IsNullOrEmpty(topicId)) return NotFound();
            // Make a new guid
            Guid guid = new Guid(topicId);

            // If we have a guid then find the topic
            Topic RequestedTopic = WmData.Topics.FirstOrDefault(t => t.TopicId == guid);

            // If that returns a topic then return to application
            if (RequestedTopic is null) return NotFound(); else return Ok(RequestedTopic);
        }

        // Get Related Journey
        [Route("Topic/Related/{topicId}")]
        [HttpGet]
        public IHttpActionResult GetRelatedTopic(string topicId)
        {
            // Make a new guid
            Guid guid = new Guid(topicId);
            // Make sure we have a guid
            if (String.IsNullOrEmpty(topicId)) return NotFound();
            // If we have a guid then find the topic
            Topic OriginalTopic = WmData.Topics.FirstOrDefault(t => t.TopicId == guid);

            // Get the related topic
            Guid RelatedGuid = OriginalTopic.RelatedTopicId;
            if (RelatedGuid == null) return NotFound();
            Topic RelatedTopic = WmData.Topics.FirstOrDefault(t => t.TopicId == guid);

            // If that returns a topic then return to application
            if (RelatedTopic is null) return NotFound(); else return Ok(RelatedTopic);
        }
        #endregion

        #region TopicUserFunctions
        // Add user to topic
        [Route("Topic/Signon/{topicId}/{user}")]
        [HttpGet]
        public IHttpActionResult SignUserToTopic(string topicId, string user)
        {
            // Make a new guid
            Guid TopicGuid = new Guid(topicId);

            // Make sure we have a guid and a user
            if (TopicGuid == null || String.IsNullOrEmpty(user)) return NotFound();

            // If we do then get the user guid
            User UserDb = WmData.Users.FirstOrDefault(u => u.Username == user);

            // Check we've got a user and if we have get the GUID
            if (UserDb == null) return NotFound();

            // Sign the user onto the topic
            UserTopic UserToTopic = new UserTopic();
            UserToTopic.UserTopicId = Guid.NewGuid();
            UserToTopic.UserId = UserDb.UserId;
            UserToTopic.TopicId = TopicGuid;
            UserToTopic.LessonProgressId = Guid.NewGuid();
            WmData.UserTopics.Add(UserToTopic);
            WmData.SaveChanges();

            // Tell the app this completed ok
            return Ok("User assigned to Topic");
        }

        // Add user to topic with ID's
        [Route("Topic/Assign/{topicId}/{userId}")]
        [HttpGet]
        public IHttpActionResult AssignUserToTopic(string topicId, string userId)
        {
            // Make a new guid
            Guid TopicGuid = new Guid(topicId);
            Guid UserGuid = new Guid(userId);

            // Make sure we have a guid and a user
            if (TopicGuid == null || UserGuid == null) return NotFound();

            // If we do then make a new UserTopic
            UserTopic UserToTopic = new UserTopic();
            UserToTopic.UserTopicId = Guid.NewGuid();
            UserToTopic.UserId = UserGuid;
            UserToTopic.TopicId = TopicGuid;
            UserToTopic.LessonProgressId = Guid.NewGuid();
            WmData.UserTopics.Add(UserToTopic);
            WmData.SaveChanges();

            return Ok("User assigned to Topic");
        }

        // Check if user is registered on topic
        [Route("Topic/UserRegistered/{topicId}/{username}")]
        [HttpGet]
        public IHttpActionResult IsUserRegistered(string topicId, string username)
        {
            // First we assume the user is not registered
            int UserRegistered = 0;

            // Make sure we have a guid and a user
            if (String.IsNullOrEmpty(topicId) || String.IsNullOrEmpty(username)) return NotFound();

            // If we do then get the user guid
            User UserDb = WmData.Users.FirstOrDefault(u => u.Username == username);

            // Check we've got a user and if we have get the GUIDs
            if (UserDb == null) return NotFound();
            Guid UserGuid = UserDb.UserId;
            Guid TopicGuid = new Guid(topicId);

            // List of Users for this Topic
            List<UserTopic> Users = WmData.UserTopics.Where(t => t.TopicId == TopicGuid).ToList();

            // See if we can find our user in that list
            UserTopic RegisteredUser = Users.Find(u => u.UserId == UserGuid);

            // Did we find a user?
            if (RegisteredUser != null) UserRegistered = 1;

            // Return true / false
            return Ok(UserRegistered);
        }

        // Check if user is on any topic
        [Route("Topic/UserRegistered/{username}")]
        [HttpGet]
        public IHttpActionResult IsUserRegisteredAny(string username)
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

            // List of Users for this Topic
            List<UserTopic> Assignments = WmData.UserTopics.Where(j => j.UserId == UserGuid).ToList();

            // Did we find a user?
            if (Assignments != null) UserRegistered = 1;

            // Return true (1) / false (0)
            return Ok(UserRegistered);
        }

        // Get a list of Users on Topic
        [Route("Topic/Users/{topicId}")]
        [HttpGet]
        public IHttpActionResult GetUsersOnTopic(string topicId)
        {
            // Make a new topic guid
            Guid TopicGuid = new Guid(topicId);

            // Make sure we have a topic guid
            if (TopicGuid == null) return NotFound();

            // Get a list of users
            List<UsersOnTopic> TopicUsers = WmData.UsersOnTopics.Where(u => u.TopicId == TopicGuid).ToList();

            // If we have users then return them
            if (TopicUsers != null) return Ok(TopicUsers); else return NotFound();
        }
        #endregion
    }
}
