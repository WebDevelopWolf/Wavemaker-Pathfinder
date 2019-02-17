import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WmApiService } from '../../services/wm-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: any;
  loggedIn: boolean;

  constructor(private router: Router, private _wmapi: WmApiService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.loggedIn = (this.user != null);
    if (!this.loggedIn 
      && (this.getUserType(this.user.email) != "SuperUser" 
      || this.getUserType(this.user.email) != "Teacher")) {    
      this.router.navigateByUrl('login');
    }
  }

  getUserType(email: string): string {
    // Make a new JS User Email Class
    let userType: string;
    class userEmail {
      Email: string;
    }
    // Populate JS Topic
    let u = new userEmail();
    u.Email = email;
    // Send JS topic to API
    this._wmapi
    .postService("User/Type", u)
    .then((result) => {
      userType = result;
    })
    .catch(error => console.log(error));
    return userType;
  }

}
