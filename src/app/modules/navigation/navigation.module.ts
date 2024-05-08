import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationRoutingModule } from './navigation-routing.module';
import { MenuSidebarComponent } from './components/features/menu-sidebar/menu-sidebar.component';
import { HeaderComponent } from './components/features/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderButtonComponent } from './components/ui/header-button/header-button.component';
import { NotesButtonComponent } from './components/ui/notes-button/notes-button.component';


@NgModule({
  declarations: [
    MenuSidebarComponent,
    HeaderComponent,
    HeaderButtonComponent,
    NotesButtonComponent
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
