import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterCreationRoutingModule } from './character-creation-routing.module';
import { NewCharacterComponent } from './components/features/new-character/new-character.component';
import { SharedModule } from '../../../../../shared/shared.module';


@NgModule({
  declarations: [
    NewCharacterComponent
  ],
  imports: [
    CommonModule,
    CharacterCreationRoutingModule,
    SharedModule
  ]
})
export class CharacterCreationModule { }
