import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterSheetRoutingModule } from './character-sheet-routing.module';
import { SheetPageComponent } from './pages/sheet-page/sheet-page.component';


@NgModule({
  declarations: [
    SheetPageComponent
  ],
  imports: [
    CommonModule,
    CharacterSheetRoutingModule
  ]
})
export class CharacterSheetModule { }
