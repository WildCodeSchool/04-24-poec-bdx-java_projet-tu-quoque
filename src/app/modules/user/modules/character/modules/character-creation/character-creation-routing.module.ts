import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewCharacterComponent } from './components/features/new-character/new-character.component';
import { userResolver } from '../../../../../shared/resolver/user.resolver';
import { authGuard } from '../../../../../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: "",
    redirectTo: "new-character",
    pathMatch: "full",
    resolve: {user: userResolver},
    canActivate: [authGuard]
  },
  {
    path: "new-character",
    component: NewCharacterComponent,
    resolve: {user: userResolver},
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharacterCreationRoutingModule { }
