import { Component, OnInit } from '@angular/core';
import { WmApiService } from '../services/wm-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {

  constructor(private _wmapi: WmApiService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private router: Router) { }

  id: number;
  private sub: any;
  session: any;
  vidUrl: any;
  sessionResources: any;
  user: any;
  loggedIn: any;
  sessionQuiz: any;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.loggedIn = (this.user != null);
    if (this.loggedIn) {
      this.getCurrentSession();
    } else {
      this.router.navigateByUrl('login');
    }
  }

  // Get the Session from the URL ID
  getCurrentSession(){
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; 
      this._wmapi
      .getService("Session/" + this.id)
      .then((result) => {
        this.session = result;
        this.vidUrl = this.sanitizer.bypassSecurityTrustResourceUrl(result.SessionVideo);
        this.getSessionResources(this.id);
        // TODO: Get badges dynamically
      })
      .catch(error => console.log(error));
    });
  }

  // Get the Session Resources For the Current Session
  getSessionResources(id) {
    this._wmapi
      .getService("Session/Resources/" + id)
      .then((result) => {
        this.sessionResources = result;
        this.sessionResources.forEach(r => {
          switch (r.ResourceType) {
            case "d":
              r.ResourceClass = "doc";
              r.ResourceIcon = "fa-file-word";
              r.ResourceLocation = "assets/resources/docs/" + r.ResourceName;
              break;
            
            case "i":
              r.ResourceClass = "image";
              r.ResourceIcon = "fa-file-image";
              r.ResourceLocation = "assets/resources/images/" + r.ResourceName;
              break;
            
            case "s":
              r.ResourceClass = "sheet";
              r.ResourceIcon = "fa-file-excel";
              r.ResourceLocation = "assets/resources/sheets/" + r.ResourceName;
              break;

            default:
              break;
          }
        });
      })
      .catch(error => console.log(error));
  }

  getSessionQuiz() {
    this._wmapi
      .getService("Session/Quiz/" + this.session.SessionId)
      .then((result) => {
        this.sessionQuiz = result;
        this.router.navigateByUrl("/quiz/" + this.sessionQuiz.QuizId);
      })
      .catch(error => console.log(error));
  }

}
