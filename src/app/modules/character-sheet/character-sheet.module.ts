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
import { StatComponent } from './components/statistics-components/features/stat/stat.component';
import { StatisticsComponent } from './components/statistics-components/ui/statistics/statistics.component';
import { SkillsComponent } from './components/skills-components/ui/skills/skills.component';
import { StatisticComponent } from './components/statistics-components/ui/statistic/statistic.component';
import { SkillListComponent } from './components/skills-components/features/skill-list/skill-list.component';
import { SkillRowComponent } from './components/skills-components/ui/skill-row/skill-row.component';
import { LevelListComponent } from './components/character-informations-components/feature/lists/level-list/level-list.component';
import { DomChangedDirective } from './shared/directives/dom-changed-directive.directive';
import { MetamorphosisComponent } from './shared/components/metamorphosis/metamorphosis.component';
import { SavingThrowsFeatureComponent } from './components/saving-throws/feature/saving-throws-feature/saving-throws-feature.component';
import { SavingThrowsListComponentComponent } from './components/saving-throws/ui/saving-throws-list-component/saving-throws-list-component.component';
import { SavingThrowsDetailsComponentComponent } from './components/saving-throws/ui/saving-throws-details-component/saving-throws-details-component.component';
import { HpAcComponentComponent } from './components/hp-ac/feature/hp-ac-component/hp-ac-component.component';
import { HpComponentComponent } from './components/hp-ac/feature/hp-component/hp-component.component';
import { MovementComponentComponent } from './components/hp-ac/feature/movement-component/movement-component.component';
import { CaComponentComponent } from './components/hp-ac/feature/ca-component/ca-component.component';
import { ReduceDamageComponentComponent } from './components/hp-ac/feature/reduce-damage-component/reduce-damage-component.component';
import { InitComponentComponent } from './components/hp-ac/feature/init-component/init-component.component';
import { MovementUiComponentComponent } from './components/hp-ac/ui/movement-ui-component/movement-ui-component.component';
import { HpUiComponentComponent } from './components/hp-ac/ui/hp-ui-component/hp-ui-component.component';
import { CaUiComponentComponent } from './components/hp-ac/ui/ca-ui-component/ca-ui-component.component';
import { ReduceDamageUiComponentComponent } from './components/hp-ac/ui/reduce-damage-ui-component/reduce-damage-ui-component.component';
import { InitUiComponentComponent } from './components/hp-ac/ui/init-ui-component/init-ui-component.component';


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
    StatComponent,
    StatisticsComponent,
    SkillsComponent,
    StatisticComponent,
    SkillListComponent,
    SkillRowComponent,
    LevelListComponent,
    DomChangedDirective,
    MetamorphosisComponent,
    SavingThrowsFeatureComponent,
    SavingThrowsListComponentComponent,
    SavingThrowsDetailsComponentComponent,
    HpAcComponentComponent,
    HpComponentComponent,
    MovementComponentComponent,
    CaComponentComponent,
    ReduceDamageComponentComponent,
    InitComponentComponent,
    MovementUiComponentComponent,
    HpUiComponentComponent,
    CaUiComponentComponent,
    ReduceDamageUiComponentComponent,
    InitUiComponentComponent
  ],
  imports: [
    CommonModule,
    CharacterSheetRoutingModule,
    FormsModule
  ]
})
export class CharacterSheetModule { }
