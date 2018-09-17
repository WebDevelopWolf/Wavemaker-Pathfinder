import { Component, OnInit } from '@angular/core';
import { BadgeService } from '../../badge.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  constructor(public badge: BadgeService) { }

  ngOnInit() {
  }

}
