import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SheetPageComponent } from './pages/sheet-page/sheet-page.component';

const routes: Routes = [
  { path: "", component: SheetPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharacterSheetRoutingModule { }
