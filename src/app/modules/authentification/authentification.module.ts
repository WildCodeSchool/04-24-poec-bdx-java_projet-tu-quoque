import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthentificationRoutingModule } from './authentification-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ConnexionPageComponent } from './components/feature/connexion-page/connexion-page.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AuthentificationRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class AuthentificationModule { }
