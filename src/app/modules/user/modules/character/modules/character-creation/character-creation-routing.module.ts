import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewCharacterComponent } from './components/features/new-character/new-character.component';
import { userResolver } from '../../../../../shared/resolver/user.resolver';

const routes: Routes = [
  {
    path: "",
    redirectTo: "new-character",
    pathMatch: "full",
    resolve: {userResolver}
  },
  {
    path: "new-character",
    component: NewCharacterComponent,
    resolve: {userResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharacterCreationRoutingModule { }
