import { Component, OnInit } from '@angular/core';
import { WmApiService } from '../wm-api.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private _wmapi: WmApiService, private router: Router) { }

  ngAfterViewInit(){
    this._wmapi.googleInit();
  }

  ngOnInit() {
  }

}
