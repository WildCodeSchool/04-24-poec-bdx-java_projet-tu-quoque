import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterSheetRoutingModule } from './character-sheet-routing.module';
import { SheetPageComponent } from './pages/sheet-page/sheet-page.component';
import { CharacterInformationsComponent } from './components/ui/character-informations/character-informations.component';
import { ClassesListComponent } from './components/feature/classes-list/classes-list.component';
import { RaceListComponent } from './components/feature/race-list/race-list.component';
import { SelectListComponent } from './components/ui/select-list/select-list.component';
import { AlignmentListComponent } from './components/feature/alignment-list/alignment-list.component';


@NgModule({
  declarations: [
    SheetPageComponent,
    CharacterInformationsComponent,
    ClassesListComponent,
    RaceListComponent,
    SelectListComponent,
    AlignmentListComponent
  ],
  imports: [
    CommonModule,
    CharacterSheetRoutingModule
  ]
})
export class CharacterSheetModule { }
