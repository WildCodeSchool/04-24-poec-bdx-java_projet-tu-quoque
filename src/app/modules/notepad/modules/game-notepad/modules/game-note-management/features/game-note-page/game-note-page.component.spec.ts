import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameNotePageComponent } from './game-note-page.component';

describe('GameNotePageComponent', () => {
  let component: GameNotePageComponent;
  let fixture: ComponentFixture<GameNotePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameNotePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameNotePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
