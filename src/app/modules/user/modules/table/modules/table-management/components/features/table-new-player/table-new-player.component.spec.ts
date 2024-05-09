import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableNewPlayerComponent } from './table-new-player.component';

describe('TableNewPlayerComponent', () => {
  let component: TableNewPlayerComponent;
  let fixture: ComponentFixture<TableNewPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableNewPlayerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableNewPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
