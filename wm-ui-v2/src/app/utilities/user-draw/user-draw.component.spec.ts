import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDrawComponent } from './user-draw.component';

describe('UserDrawComponent', () => {
  let component: UserDrawComponent;
  let fixture: ComponentFixture<UserDrawComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDrawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
