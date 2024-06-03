import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceButtonComponent } from './dice-button.component';

describe('DiceButtonComponent', () => {
  let component: DiceButtonComponent;
  let fixture: ComponentFixture<DiceButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiceButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiceButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
