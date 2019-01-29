import { TestBed, inject } from '@angular/core/testing';

import { BadgeServiceService } from './badge-service.service';

describe('BadgeServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BadgeServiceService]
    });
  });

  it('should be created', inject([BadgeServiceService], (service: BadgeServiceService) => {
    expect(service).toBeTruthy();
  }));
});
