import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnexionPageComponent } from './connexion-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomFormComponent } from '../../../../shared/components/custom-form/custom-form.component';

describe('ConnexionPageComponent', () => {
  let component: ConnexionPageComponent;
  let fixture: ComponentFixture<ConnexionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ConnexionPageComponent,
        CustomFormComponent,
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConnexionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
