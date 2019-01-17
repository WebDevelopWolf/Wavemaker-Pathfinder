import { TestBed, inject } from '@angular/core/testing';

import { WmApiService } from './wm-api.service';

describe('WmApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WmApiService]
    });
  });

  it('should be created', inject([WmApiService], (service: WmApiService) => {
    expect(service).toBeTruthy();
  }));
});
