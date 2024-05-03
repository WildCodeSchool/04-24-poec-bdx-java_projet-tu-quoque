import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSidebarComponent } from './menu-sidebar.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('MenuSidebarComponent', () => {
  let component: MenuSidebarComponent;
  let fixture: ComponentFixture<MenuSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuSidebarComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MenuSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
