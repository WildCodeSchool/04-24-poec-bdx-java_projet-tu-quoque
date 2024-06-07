import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCharactersComponent } from './components/features/user-characters/user-characters.component';
import { CharacterPageComponent } from './components/features/character-page/character-page.component';
import { userResolver } from '../../../../../shared/resolver/user.resolver';

const routes: Routes = [
  {
    path: "",
    redirectTo: "my-characters",
    pathMatch: "full",
    resolve: {userResolver}
  },
  {
    path: "my-characters",
    component: UserCharactersComponent,
    resolve: {userResolver}
  },
  {
    path: "my-characters/:id",
    component: CharacterPageComponent,
    resolve: {userResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharacterManagementRoutingModule { }
