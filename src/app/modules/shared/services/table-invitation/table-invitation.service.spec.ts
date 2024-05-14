import { TestBed } from '@angular/core/testing';

import { TableInvitationService } from './table-invitation.service';

describe('TableInvitationService', () => {
  let service: TableInvitationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableInvitationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
