import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAreaTitleComponent } from './custom-area-title.component';

describe('CustomAreaTitleComponent', () => {
  let component: CustomAreaTitleComponent;
  let fixture: ComponentFixture<CustomAreaTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomAreaTitleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomAreaTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
