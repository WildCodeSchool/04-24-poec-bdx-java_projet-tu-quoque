import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterSheetRoutingModule } from './character-sheet-routing.module';
import { SheetPageComponent } from './pages/sheet-page/sheet-page.component';
import { CharacterInformationsComponent } from './components/character-informations-components/ui/character-informations/character-informations.component';
import { ClassesListComponent } from './components/character-informations-components/feature/lists/classes-list/classes-list.component';
import { RaceListComponent } from './components/character-informations-components/feature/lists/race-list/race-list.component';
import { SelectListComponent } from './components/character-informations-components/ui/select-list/select-list.component';
import { AlignmentListComponent } from './components/character-informations-components/feature/lists/alignment-list/alignment-list.component';
import { FormsModule } from '@angular/forms';
import { NgModelDebounceChangeDirective } from '../shared/directives/ng-model-debounce-change.directive';
import { GenderListComponent } from './components/character-informations-components/feature/lists/gender-list/gender-list.component';
import { SizeCategorieAutoComponent } from './components/character-informations-components/feature/auto/size-categorie-auto/size-categorie-auto.component';
import { HeightAutoComponent } from './components/character-informations-components/feature/auto/height-auto/height-auto.component';
import { SelfFilledComponent } from './components/character-informations-components/ui/self-filled/self-filled.component';
import { WeightAutoComponent } from './components/character-informations-components/feature/auto/weight-auto/weight-auto.component';
import { AgeAutoComponent } from './components/character-informations-components/feature/auto/age-auto/age-auto.component';
import { InputFieldComponent } from './components/character-informations-components/ui/input-field/input-field.component';
import { FirstLineInputsComponent } from './components/character-informations-components/feature/inputs/first-line-inputs/first-line-inputs.component';
import { GodInputComponent } from './components/character-informations-components/feature/inputs/god-input/god-input.component';
import { ThirdLineInputsComponent } from './components/character-informations-components/feature/inputs/third-line-inputs/third-line-inputs.component';
import { StrengthComponent } from './components/statistics-components/features/strength/strength.component';
import { StatComponent } from './components/statistics-components/ui/stat/stat.component';
import { StatisticsComponent } from './components/statistics-components/ui/statistics/statistics.component';
import { SkillsComponent } from './components/skills-components/ui/skills/skills.component';


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
    StrengthComponent,
    StatComponent,
    StatisticsComponent,
    SkillsComponent,

  ],
  imports: [
    CommonModule,
    CharacterSheetRoutingModule,
    FormsModule
  ]
})
export class CharacterSheetModule { }
