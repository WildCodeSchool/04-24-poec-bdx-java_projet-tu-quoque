import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteCreationPageComponent } from './note-creation-page.component';

describe('NoteCreationPageComponent', () => {
  let component: NoteCreationPageComponent;
  let fixture: ComponentFixture<NoteCreationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteCreationPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoteCreationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
