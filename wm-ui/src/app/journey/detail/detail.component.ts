import { Component, OnInit } from '@angular/core';
import { WmApiService } from '../../wm-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  constructor(private _wmapi: WmApiService, private route: ActivatedRoute) { }

  id: number;
  private sub: any;
  journey: any;

  ngOnInit() {
    this.getJourney();
    // TODO: Get Related Journey
    // TODO: Add Mechanics for When User is Signed on to Journey
  }

  getJourney() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; 
      this._wmapi
      .getService("Journey/" + this.id)
      .then((result) => {
        this.journey = result;
      })
      .catch(error => console.log(error));
   });
  }

}
