import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingSheetComponent } from './drawing-sheet.component';

describe('DrawingSheetComponent', () => {
  let component: DrawingSheetComponent;
  let fixture: ComponentFixture<DrawingSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DrawingSheetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DrawingSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
