import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfElementComponent } from './list-of-element.component';

describe('ListOfElementComponent', () => {
  let component: ListOfElementComponent;
  let fixture: ComponentFixture<ListOfElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListOfElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListOfElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
