using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using wm_api.Models;

namespace wm_api.Controllers
{
    public class BadgeController : ApiController
    {
        WmDataContext WmData = new WmDataContext();

        #region HelperFunctions
        public bool AwardBadgeByType(Guid multiId, string awardType, Guid userId)
        {
            // Check for the params we need to award the badge
            if (String.IsNullOrEmpty(awardType) || multiId == null || userId == null) return false;

            // Got them? Great, now that's see what we're awarding the badge for
            Badge Award = new Badge();
            switch (awardType.ToLower())
            {
                case "challenge":
                    // Look for a quiz / challenge ID
                    Award = WmData.Badges.FirstOrDefault(b => b.ChallengeId == multiId);
                    break;
                case "lesson":
                    // Look for a Lesson ID
                    Award = WmData.Badges.FirstOrDefault(b => b.LessonId == multiId);
                    break;
                case "journey":
                    // Look for a Journey ID
                    Award = WmData.Badges.FirstOrDefault(b => b.JourneyId == multiId);
                    break;
                default:
                    break;
            }

            // Did we get a badge there?
            if (Award == null) return false;

            // We did? Awesome, lets give it to the user
            try
            {
                UserBadge Awarded = new UserBadge();
                Awarded.UserBadgeId = Guid.NewGuid();
                Awarded.BadgeId = Award.BadgeId;
                Awarded.UserId = userId;
                WmData.UserBadges.Add(Awarded);
                WmData.SaveChanges();
            }
            // Uh-oh - something went wrong, we should let our other function know!
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
                throw;
            }

            // Cool, all added!
            return true;
        }
        #endregion


    }
}
