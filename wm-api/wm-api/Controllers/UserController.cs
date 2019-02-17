using wm_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace wm_api.Controllers
{
    public class UserController : ApiController
    {
        WmDataContext WmData = new WmDataContext();

        #region Classes
        public class UserEmail
        {
            public string Email { get; set; }
        }
        #endregion

        #region GetUsers
        // Get Single User by Username
        [Route("User/{username}")]
        [HttpGet]
        public IHttpActionResult GetUserByUsername(string username)
        {
            // Check if username is valid
            if (username is null || username == "") return NotFound();

            // Get User from the database
            var SingleUser = WmData.Users.FirstOrDefault(u => u.Username == username);

            // Return the single user if found, if not return not found
            if (SingleUser is null) return NotFound(); else return Ok(SingleUser);
        }

        // Get Single User by Email
        [Route("User/")]
        [HttpPost]
        public IHttpActionResult GetUserByEmail([FromBody] UserEmail useremail)
        {
            // Check if username is valid
            if (useremail.Email is null || useremail.Email == "") return NotFound();

            // Get User from the database
            var SingleUser = WmData.Users.FirstOrDefault(u => u.UserEmail == useremail.Email);

            // Return the single user if found, if not return not found
            if (SingleUser is null) return NotFound(); else return Ok(SingleUser);
        }

        // Get Global User Leaderboard
        [Route("User/Leaderboard")]
        [HttpGet]
        public IHttpActionResult GetGlobalLeaderboard()
        {
            // Get the whole global leaderboard
            List<GlobalUserLeaderboard> Leaderboard = WmData.GlobalUserLeaderboards.ToList();

            // If the leaderboard has users then return
            if (Leaderboard.Count > 0 && Leaderboard != null) return Ok(Leaderboard); else return NotFound();
        }

        // Get Users Position in Leaderboard
        [Route("User/Leaderboard/Position/{username}")]
        [HttpGet]
        public IHttpActionResult GetUserLeaderboardPos(string username)
        {
            // Check if username is valid
            if (username is null || username == "") return NotFound();

            // Get the whole global leaderboard
            List<GlobalUserLeaderboard> Leaderboard = WmData.GlobalUserLeaderboards.ToList();

            // Get Users position in leaderboard
            Int32 Pos = Leaderboard.IndexOf(Leaderboard.Find(u => u.Username == username));
            Pos++;

            // If position found then return
            if (Pos != 0) return Ok(Pos); else return NotFound();
        }

        // Get Global Users List
        [Route("Users")]
        [HttpGet]
        public IHttpActionResult GetListOfUsers()
        {
            // Get the users from the database
            List<User> AllUsers = WmData.Users.ToList();

            // If the leaderboard has users then return
            if (AllUsers.Count > 0 && AllUsers != null) return Ok(AllUsers); else return NotFound();
        }

        // Get User Type
        [Route("User/Type")]
        [HttpPost]
        public IHttpActionResult GetUserType([FromBody] UserEmail useremail)
        {
            // Check if user's email is valid
            if (useremail.Email is null || useremail.Email == "") return NotFound();

            // Get the User
            var RequestedUser = WmData.Users.FirstOrDefault(u => u.UserEmail == useremail.Email);

            // Get the Type GUID
            Guid? UserTypeID = RequestedUser.UserTypeId;

            // Find User Type
            UserType Type = WmData.UserTypes.FirstOrDefault(t => t.UserTypeId == UserTypeID);

            // If we have a type then return it
            if (Type != null) return Ok(Type.UserType_); else return NotFound();
        }
        #endregion

    }
}
