import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersToAcceptComponent } from './characters-to-accept.component';

describe('CharactersToAcceptComponent', () => {
  let component: CharactersToAcceptComponent;
  let fixture: ComponentFixture<CharactersToAcceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharactersToAcceptComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharactersToAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
