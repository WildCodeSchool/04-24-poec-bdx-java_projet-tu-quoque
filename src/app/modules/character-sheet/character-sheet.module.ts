import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterSheetRoutingModule } from './character-sheet-routing.module';
import { SheetPageComponent } from './pages/sheet-page/sheet-page.component';
import { CharacterInformationsComponent } from './components/ui/character-informations/character-informations.component';
import { ClassesListComponent } from './components/feature/lists/classes-list/classes-list.component';
import { RaceListComponent } from './components/feature/lists/race-list/race-list.component';
import { SelectListComponent } from './components/ui/select-list/select-list.component';
import { AlignmentListComponent } from './components/feature/lists/alignment-list/alignment-list.component';
import { FormsModule } from '@angular/forms';
import { NgModelDebounceChangeDirective } from '../shared/directives/ng-model-debounce-change.directive';
import { GenderListComponent } from './components/feature/lists/gender-list/gender-list.component';
import { SizeCategorieAutoComponent } from './components/feature/auto/size-categorie-auto/size-categorie-auto.component';
import { HeightAutoComponent } from './components/feature/auto/height-auto/height-auto.component';
import { SelfFilledComponent } from './components/ui/self-filled/self-filled.component';
import { WeightAutoComponent } from './components/feature/auto/weight-auto/weight-auto.component';
import { AgeAutoComponent } from './components/feature/auto/age-auto/age-auto.component';


@NgModule({
  declarations: [
    SheetPageComponent,
    CharacterInformationsComponent,
    ClassesListComponent,
    RaceListComponent,
    SelectListComponent,
    AlignmentListComponent,
    NgModelDebounceChangeDirective,
    GenderListComponent,
    SizeCategorieAutoComponent,
    HeightAutoComponent,
    SelfFilledComponent,
    WeightAutoComponent,
    AgeAutoComponent,

  ],
  imports: [
    CommonModule,
    CharacterSheetRoutingModule,
    FormsModule
  ]
})
export class CharacterSheetModule { }
