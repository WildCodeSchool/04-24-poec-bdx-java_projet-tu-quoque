import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCommentPageComponent } from './show-comment-page.component';

describe('ShowCommentPageComponent', () => {
  let component: ShowCommentPageComponent;
  let fixture: ComponentFixture<ShowCommentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowCommentPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowCommentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
