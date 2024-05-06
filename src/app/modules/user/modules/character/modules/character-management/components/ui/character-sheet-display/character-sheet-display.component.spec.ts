import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSheetDisplayComponent } from './character-sheet-display.component';

describe('CharacterSheetDisplayComponent', () => {
  let component: CharacterSheetDisplayComponent;
  let fixture: ComponentFixture<CharacterSheetDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterSheetDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharacterSheetDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
