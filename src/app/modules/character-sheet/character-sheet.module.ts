import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterSheetRoutingModule } from './character-sheet-routing.module';
import { SheetPageComponent } from './pages/sheet-page/sheet-page.component';
import { CharacterInformationsComponent } from './character-informations-components/ui/character-informations/character-informations.component';
import { ClassesListComponent } from './character-informations-components/feature/lists/classes-list/classes-list.component';
import { RaceListComponent } from './character-informations-components/feature/lists/race-list/race-list.component';
import { SelectListComponent } from './character-informations-components/ui/select-list/select-list.component';
import { AlignmentListComponent } from './character-informations-components/feature/lists/alignment-list/alignment-list.component';
import { FormsModule } from '@angular/forms';
import { NgModelDebounceChangeDirective } from '../shared/directives/ng-model-debounce-change.directive';
import { GenderListComponent } from './character-informations-components/feature/lists/gender-list/gender-list.component';
import { SizeCategorieAutoComponent } from './character-informations-components/feature/auto/size-categorie-auto/size-categorie-auto.component';
import { HeightAutoComponent } from './character-informations-components/feature/auto/height-auto/height-auto.component';
import { SelfFilledComponent } from './character-informations-components/ui/self-filled/self-filled.component';
import { WeightAutoComponent } from './character-informations-components/feature/auto/weight-auto/weight-auto.component';
import { AgeAutoComponent } from './character-informations-components/feature/auto/age-auto/age-auto.component';
import { InputFieldComponent } from './character-informations-components/ui/input-field/input-field.component';
import { FirstLineInputsComponent } from './character-informations-components/feature/inputs/first-line-inputs/first-line-inputs.component';
import { GodInputComponent } from './character-informations-components/feature/inputs/god-input/god-input.component';
import { ThirdLineInputsComponent } from './character-informations-components/feature/inputs/third-line-inputs/third-line-inputs.component';


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
    InputFieldComponent,
    FirstLineInputsComponent,
    GodInputComponent,
    ThirdLineInputsComponent,

  ],
  imports: [
    CommonModule,
    CharacterSheetRoutingModule,
    FormsModule
  ]
})
export class CharacterSheetModule { }
