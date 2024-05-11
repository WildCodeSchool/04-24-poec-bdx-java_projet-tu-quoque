import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingDisplayComponent } from './drawing-display.component';

describe('DrawingDisplayComponent', () => {
  let component: DrawingDisplayComponent;
  let fixture: ComponentFixture<DrawingDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DrawingDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DrawingDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
