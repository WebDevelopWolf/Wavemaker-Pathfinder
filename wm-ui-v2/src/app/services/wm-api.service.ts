import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { Router } from "@angular/router";
import { AuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

declare const gapi: any;

@Injectable()
export class WmApiService {

  //private _baseUrl = "http://wm-api.webdevelopwolf.com/"; // Test server api
  private _baseUrl = "http://localhost:58061/"; // Dev server api 

  // Global API / Login Variables
  userloggedin = 0;
  modules: any;
  public auth2: any;
  userProfile: any;
  user: any;
  loggedIn: boolean;

  // Default User Variables 
  // TODO: Disable in Production
  tempuser: string;
  tempuseravatar: any;
  tempuserfullname: any;
  tempuseremail: any;

  constructor(private _http: Http, private router: Router, private authService: AuthService) {
    console.log('Wavemaker API Initialized...');
  }

  // Get User Data
  getLoggedInUser(): Promise<any> {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if (this.loggedIn) {
        this.tempuser = this.user;
        this.tempuseravatar = this.user.photoUrl;
        this.tempuserfullname = this.user.firstname + " " + this.user.surname;
        this.tempuseremail = this.user.email;
      }      
    });
    return this.user;
  }

  // On successful API call
  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  // On Error in API Call
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  // Basic Get W/ No Body
  getService(url: string): Promise<any> {
    return this._http
        .get(this._baseUrl + url)
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
  }

  // Basic Post W/ Body
  postService(url: string, body: any): Promise<any> {
    console.log(body);
    let headers = new Headers({'Content-Type': 'application/json'});
    return this._http
      .post(this._baseUrl + url, body, {headers: headers})
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

}
