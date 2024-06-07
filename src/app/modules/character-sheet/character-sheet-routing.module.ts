import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SheetPageComponent } from './pages/sheet-page/sheet-page.component';
import { userResolver } from '../shared/resolver/user.resolver';

const routes: Routes = [
  { path: "", 
  component: SheetPageComponent, 
  resolve: {userResolver} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharacterSheetRoutingModule { }
