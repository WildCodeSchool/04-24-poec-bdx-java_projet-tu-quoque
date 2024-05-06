import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterSheetRoutingModule } from './character-sheet-routing.module';
import { SheetPageComponent } from './pages/sheet-page/sheet-page.component';
import { CharacterInformationsComponent } from './components/ui/character-informations/character-informations/character-informations.component';


@NgModule({
  declarations: [
    SheetPageComponent,
    CharacterInformationsComponent
  ],
  imports: [
    CommonModule,
    CharacterSheetRoutingModule
  ]
})
export class CharacterSheetModule { }
