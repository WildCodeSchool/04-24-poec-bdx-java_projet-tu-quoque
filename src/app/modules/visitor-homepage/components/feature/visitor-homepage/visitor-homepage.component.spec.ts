import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorHomepageComponent } from './visitor-homepage.component';

describe('VisitorHomepageComponent', () => {
  let component: VisitorHomepageComponent;
  let fixture: ComponentFixture<VisitorHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisitorHomepageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisitorHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
