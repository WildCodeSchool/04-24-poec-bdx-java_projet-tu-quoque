import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterManagementRoutingModule } from './character-management-routing.module';
import { UserCharactersComponent } from './components/features/user-characters/user-characters.component';
import { CharacterPageComponent } from './components/features/character-page/character-page.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { CharacterPresentationComponent } from './components/ui/character-presentation/character-presentation.component';
import { CharacterSheetDisplayComponent } from './components/ui/character-sheet-display/character-sheet-display.component';


@NgModule({
  declarations: [
    UserCharactersComponent,
    CharacterPageComponent,
    CharacterPresentationComponent,
    CharacterSheetDisplayComponent,
  ],
  imports: [
    CommonModule,
    CharacterManagementRoutingModule,
    SharedModule
  ]
})
export class CharacterManagementModule { }
