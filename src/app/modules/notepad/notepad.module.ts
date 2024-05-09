import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotepadRoutingModule } from './notepad-routing.module';
import { NotepadMainPageComponent } from './features/notepad-main-page/notepad-main-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
  
    NotepadMainPageComponent
  ],
  imports: [
    CommonModule,
    NotepadRoutingModule,
    SharedModule
  ]
})
export class NotepadModule { }
