import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterInformationsComponent } from './character-informations.component';

describe('CharacterInformationsComponent', () => {
  let component: CharacterInformationsComponent;
  let fixture: ComponentFixture<CharacterInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterInformationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharacterInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
