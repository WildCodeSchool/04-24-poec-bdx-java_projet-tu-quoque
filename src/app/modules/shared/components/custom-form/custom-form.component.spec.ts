import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFormComponent } from './custom-form.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('CustomFormComponent', () => {
  let component: CustomFormComponent;
  let fixture: ComponentFixture<CustomFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomFormComponent,
      ],
      imports: [FormsModule, ReactiveFormsModule
      ]
    })
      .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    await fixture.whenStable()
    fixture.detectChanges()
    expect(component).toBeTruthy();
  });
});
