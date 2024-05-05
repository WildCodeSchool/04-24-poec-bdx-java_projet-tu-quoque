import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterManagementRoutingModule } from './character-management-routing.module';
import { UserCharactersComponent } from './components/user-characters/user-characters.component';
import { CharacterPageComponent } from './components/character-page/character-page.component';


@NgModule({
  declarations: [
    UserCharactersComponent,
    CharacterPageComponent
  ],
  imports: [
    CommonModule,
    CharacterManagementRoutingModule
  ]
})
export class CharacterManagementModule { }
