import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterCreationRoutingModule } from './character-creation-routing.module';
import { SharedModule } from '../../../../../shared/shared.module';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    CharacterCreationRoutingModule,
    SharedModule
  ]
})
export class CharacterCreationModule { }
