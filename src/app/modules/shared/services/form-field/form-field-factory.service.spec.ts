import { TestBed } from '@angular/core/testing';

import { FormFieldFactoryService } from './form-field-factory.service';

describe('FormFieldFactoryService', () => {
  let service: FormFieldFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormFieldFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
