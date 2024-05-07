import { TestBed } from '@angular/core/testing';

import { GetFieldsService } from './get-fields.service';

describe('GetFieldsService', () => {
  let service: GetFieldsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetFieldsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
