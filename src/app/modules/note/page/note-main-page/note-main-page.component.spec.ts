import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteMainPageComponent } from './note-main-page.component';

describe('NoteMainPageComponent', () => {
  let component: NoteMainPageComponent;
  let fixture: ComponentFixture<NoteMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteMainPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoteMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
