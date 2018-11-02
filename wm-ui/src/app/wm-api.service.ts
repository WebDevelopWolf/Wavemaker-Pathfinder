import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { Router } from "@angular/router";

declare const gapi: any;

@Injectable()
export class WmApiService {

  private _baseUrl = "http://wm-api.webdevelopwolf.com/"; // Test server api
  //private _baseUrl = "http://localhost:58061/"; // Dev server api 
  tempuser = localStorage.getItem('username');
  tempuseravatar = localStorage.getItem('useravatar');
  tempuserfullname = localStorage.getItem('userfullname');
  tempuseremail = localStorage.getItem('useremail');
  userloggedin = 0;
  modules: any;
  public auth2: any;
  userProfile: any;
  user: any;

  constructor(private _http: Http, private router: Router) {
    console.log('Wavemaker API Initialized...');
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

  // Initalise Google Sign-On
  // NOTE: Currently registered to http://localhost:4200/ - will need to change when on server to final URL
  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '933803013928-4vvjqtql0nt7ve5upak2u5fhpa636ma0.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email',
        prompt: 'select_account consent'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }

  // Log user in via Google OAuth 2
  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        // Get profile from Google
        let profile = googleUser.getBasicProfile();        
        // Save user to the API until changed
        localStorage.setItem('username', profile.getEmail().substring(0, profile.getEmail().indexOf("@")));
        localStorage.setItem('useravatar', profile.getImageUrl());
        localStorage.setItem('userfullname', profile.getName());
        localStorage.setItem('useremail', profile.getEmail());
        // Log the user in
        this.userloggedin = 1;
        // Redirect to dashboard
        this.router.navigate(['/dashboard']);
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
        // To get auth token - googleUser.getAuthResponse().id_token;
        // To get user id - profile.getId();
      });
  }

}
