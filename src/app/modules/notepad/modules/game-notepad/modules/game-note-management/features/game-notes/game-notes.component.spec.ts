import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameNotesComponent } from './game-notes.component';

describe('GameNotesComponent', () => {
  let component: GameNotesComponent;
  let fixture: ComponentFixture<GameNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameNotesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
