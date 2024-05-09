import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNotePageComponent } from './user-note-page.component';

describe('UserNotePageComponent', () => {
  let component: UserNotePageComponent;
  let fixture: ComponentFixture<UserNotePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserNotePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserNotePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
