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
import { SavingThrowsListComponent } from './components/saving-throws/ui/saving-throws-list-component/saving-throws-list-component.component';
import { SavingThrowsDetailsComponent } from './components/saving-throws/ui/saving-throws-details-component/saving-throws-details-component.component';
import { HpAcComponent } from './components/hp-ac/feature/hp-ac-component/hp-ac-component.component';
import { HitPointComponent } from './components/hp-ac/feature/hp-component/hp-component.component';
import { MovementComponent } from './components/hp-ac/feature/movement-component/movement-component.component';
import { ArmorClassComponent } from './components/hp-ac/feature/ca-component/ca-component.component';
import { ReduceDamageComponent } from './components/hp-ac/feature/reduce-damage-component/reduce-damage-component.component';
import { InitiativeComponent } from './components/hp-ac/feature/init-component/init-component.component';
import { MovementUiComponent } from './components/hp-ac/ui/movement-ui-component/movement-ui-component.component';
import { HitPointUIComponent } from './components/hp-ac/ui/hp-ui-component/hp-ui-component.component';
import { ArmorClassUIComponent } from './components/hp-ac/ui/ca-ui-component/ca-ui-component.component';
import { ReduceDamageUiComponent } from './components/hp-ac/ui/reduce-damage-ui-component/reduce-damage-ui-component.component';
import { InitiativeUIComponent } from './components/hp-ac/ui/init-ui-component/init-ui-component.component';
import { BaseAttackBonusComponent } from './components/bba-components/features/bba-component/bba-component.component';
import { BaseAttackBonusUiComponent } from './components/bba-components/ui/bba-ui/bba-ui.component';
import { MagicalResistanceComponent } from './components/bba-components/ui/magical-resistance/magical-resistance.component';
import { WrestlingComponent } from './components/bba-components/ui/wrestling/wrestling.component';
import { AttacksComponent } from './components/attacks/features/attacks/attacks.component';
import { AttackComponent } from './components/attacks/ui/attack/attack.component';
import { ArmorUiComponent } from './components/defense/ui/armor-ui/armor-ui.component';
import { ShieldUiComponent } from './components/defense/ui/shield-ui/shield-ui.component';
import { ProtectionUiComponent } from './components/defense/ui/protection-ui/protection-ui.component';
import { DefensesComponent } from './components/defense/feature/defenses/defenses.component';
import { MarketPlaceComponent } from './components/market/feature/market-place/market-place.component';
import { BuyWeaponsComponent } from './components/market/ui/buy-weapons/buy-weapons.component';
import { PurseComponent } from './components/possessions/ui/purse/purse.component';
import { PossessionsComponent } from './components/possessions/feature/possessions/possessions.component';
import { EquipmentComponent } from './components/possessions/ui/equipment/equipment.component';


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
    SavingThrowsListComponent,
    SavingThrowsDetailsComponent,
    HpAcComponent,
    HitPointComponent,
    MovementComponent,
    ArmorClassComponent,
    ReduceDamageComponent,
    InitiativeComponent,
    MovementUiComponent,
    HitPointUIComponent,
    ArmorClassUIComponent,
    ReduceDamageUiComponent,
    InitiativeUIComponent,
    BaseAttackBonusComponent,
    BaseAttackBonusUiComponent,
    MagicalResistanceComponent,
    WrestlingComponent,
    AttacksComponent,
    AttackComponent,
    ArmorUiComponent,
    ShieldUiComponent,
    ProtectionUiComponent,
    DefensesComponent,
    MarketPlaceComponent,
    BuyWeaponsComponent,
    PurseComponent,
    PossessionsComponent,
    EquipmentComponent
  ],
  imports: [
    CommonModule,
    CharacterSheetRoutingModule,
    FormsModule
  ]
})
export class CharacterSheetModule { }
