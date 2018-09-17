import { Injectable } from '@angular/core';

@Injectable()
export class BadgeService {

  badgeTitle: string = "You earned a Badge!";
  badgeEarned: string;
  showToast: boolean = false;

  constructor() { }

  rewardBadge(badgeEarned: string) {
    this.badgeEarned = badgeEarned;
    this.showToast = true;
    setTimeout(() => { this.showToast = false; }, 5000);
  }

}
