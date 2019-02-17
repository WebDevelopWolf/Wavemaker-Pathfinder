import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LoginServiceService {

  constructor() { }

  private appUser = new BehaviorSubject(null);
  public appUser$ = this.appUser.asObservable();
  public loggedin: boolean = false;

  modifyStatus(appUser: any) {
    this.appUser.next(appUser);
  }

}
