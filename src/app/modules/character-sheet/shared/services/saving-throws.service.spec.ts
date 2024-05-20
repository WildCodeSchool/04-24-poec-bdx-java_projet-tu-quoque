import { TestBed } from '@angular/core/testing';

import { SavingThrowsService } from './saving-throws.service';

describe('SavingThrowsService', () => {
  let service: SavingThrowsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavingThrowsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
