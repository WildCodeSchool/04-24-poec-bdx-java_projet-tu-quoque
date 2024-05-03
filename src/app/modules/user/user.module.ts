import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserHomepageComponent } from './components/features/user-homepage/user-homepage.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    UserHomepageComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
