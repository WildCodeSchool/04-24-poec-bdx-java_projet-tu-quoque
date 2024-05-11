import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitorHomepageRoutingModule } from './visitor-homepage-routing.module';
import { VisitorHomepageComponent } from './components/feature/visitor-homepage/visitor-homepage.component';
import { SharedModule } from '../shared/shared.module';
import { RouterLink } from '@angular/router';


@NgModule({
  declarations: [

  
    VisitorHomepageComponent
  ],
  imports: [
    CommonModule,
    VisitorHomepageRoutingModule,
    SharedModule,
    RouterLink
  ]
})
export class VisitorHomepageModule { }
