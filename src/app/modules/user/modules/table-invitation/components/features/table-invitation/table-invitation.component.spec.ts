import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableInvitationComponent } from './table-invitation.component';

describe('TableInvitationComponent', () => {
  let component: TableInvitationComponent;
  let fixture: ComponentFixture<TableInvitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableInvitationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
