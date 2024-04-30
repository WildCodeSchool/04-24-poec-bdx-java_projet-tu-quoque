import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationRoutingModule } from './navigation-routing.module';
import { MenuSidebarComponent } from './components/features/menu-sidebar/menu-sidebar.component';
import { HeaderComponent } from './components/features/header/header.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MenuSidebarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    NavigationRoutingModule,
    SharedModule
  ],
  exports: [
    MenuSidebarComponent,
    HeaderComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NavigationModule { }
