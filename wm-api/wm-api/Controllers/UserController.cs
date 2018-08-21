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
    }
}
