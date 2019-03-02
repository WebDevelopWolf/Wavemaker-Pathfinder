import { Component, OnInit } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { LoginServiceService } from '../services/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any;
  loggedIn: boolean;

  constructor(private authService: AuthService, private _login: LoginServiceService, private router: Router) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this._login.modifyStatus(user);
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe((user) => {
      this.user = user;
      localStorage.setItem('user', JSON.stringify(this.user));
    });
  }
 
  continue(): void {
    this.router.navigateByUrl("/dashboard");
  }

  signOut(): void {
    this.authService.signOut();
    this._login.loggedin = false;
    localStorage.removeItem('user');
  }
}
