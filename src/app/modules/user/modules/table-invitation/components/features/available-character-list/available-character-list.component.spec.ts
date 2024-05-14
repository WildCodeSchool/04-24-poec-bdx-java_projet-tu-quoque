import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableCharacterListComponent } from './available-character-list.component';

describe('AvailableCharacterListComponent', () => {
  let component: AvailableCharacterListComponent;
  let fixture: ComponentFixture<AvailableCharacterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AvailableCharacterListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvailableCharacterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
