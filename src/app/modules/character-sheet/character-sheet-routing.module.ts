import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SheetPageComponent } from './pages/sheet-page/sheet-page.component';
import { userResolver } from '../shared/resolver/user.resolver';
import { authGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  { path: "",   
  component: SheetPageComponent, 
  resolve: {user: userResolver}, 
  canActivate: [authGuard]
 },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharacterSheetRoutingModule { }
