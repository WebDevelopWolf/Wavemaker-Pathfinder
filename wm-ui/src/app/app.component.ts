import { Component } from '@angular/core';
import { WmApiService } from './wm-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WmApiService]
})
export class AppComponent {
  title = 'app';
}
