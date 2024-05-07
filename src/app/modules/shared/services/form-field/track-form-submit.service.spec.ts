import { TestBed } from '@angular/core/testing';

import { TrackFormSubmitService } from './track-form-submit.service';

describe('TrackFormSubmitService', () => {
  let service: TrackFormSubmitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackFormSubmitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
