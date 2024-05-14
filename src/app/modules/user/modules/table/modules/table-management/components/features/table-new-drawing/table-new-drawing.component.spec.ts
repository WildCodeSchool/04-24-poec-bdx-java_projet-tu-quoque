import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableNewDrawingComponent } from './table-new-drawing.component';

describe('TableNewDrawingComponent', () => {
  let component: TableNewDrawingComponent;
  let fixture: ComponentFixture<TableNewDrawingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableNewDrawingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableNewDrawingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
