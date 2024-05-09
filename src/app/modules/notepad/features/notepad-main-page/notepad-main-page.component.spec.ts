import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotepadMainPageComponent } from './notepad-main-page.component';

describe('NotepadMainPageComponent', () => {
  let component: NotepadMainPageComponent;
  let fixture: ComponentFixture<NotepadMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotepadMainPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotepadMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
