import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotepadRoutingModule } from './notepad-routing.module';
import { NotepadMainPageComponent } from './features/notepad-main-page/notepad-main-page.component';
import { SharedModule } from '../shared/shared.module';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [NotepadMainPageComponent],
  imports: [
    CommonModule, 
    NotepadRoutingModule, 
    SharedModule,
    ToastModule],
    providers: [MessageService]
})
export class NotepadModule {}
