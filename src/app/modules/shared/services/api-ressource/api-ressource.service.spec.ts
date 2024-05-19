import { TestBed } from '@angular/core/testing';

import { ApiRessourceService } from './api-ressource.service';

describe('ApiRessourceService', () => {
  let service: ApiRessourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRessourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
