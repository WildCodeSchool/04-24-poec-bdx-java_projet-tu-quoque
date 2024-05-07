import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHomepageComponent } from './user-homepage.component';
import { CustomButtonComponent } from '../../../../shared/components/custom-button/custom-button.component';
import { FormsModule } from '@angular/forms';

describe('UserHomepageComponent', () => {
  let component: UserHomepageComponent;
  let fixture: ComponentFixture<UserHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserHomepageComponent,
        CustomButtonComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
