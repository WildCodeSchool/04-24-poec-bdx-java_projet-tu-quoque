import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputErrorComponent } from './input-error.component';

describe('InputErrorComponent', () => {
  let component: InputErrorComponent;
  let fixture: ComponentFixture<InputErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputErrorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    await fixture.whenStable()
    fixture.detectChanges()
    expect(component).toBeTruthy();
  });
});