import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetPageComponent } from './sheet-page.component';

describe('SheetPageComponent', () => {
  let component: SheetPageComponent;
  let fixture: ComponentFixture<SheetPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SheetPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SheetPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
