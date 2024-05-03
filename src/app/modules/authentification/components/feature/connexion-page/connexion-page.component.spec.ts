import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnexionPageComponent } from '../../connexion/connexion-page/connexion-page.component';

describe('ConnexionPageComponent', () => {
  let component: ConnexionPageComponent;
  let fixture: ComponentFixture<ConnexionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConnexionPageComponent]
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