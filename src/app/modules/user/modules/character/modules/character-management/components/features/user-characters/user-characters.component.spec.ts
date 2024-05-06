import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCharactersComponent } from './user-characters.component';

describe('UserCharactersComponent', () => {
  let component: UserCharactersComponent;
  let fixture: ComponentFixture<UserCharactersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserCharactersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserCharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
