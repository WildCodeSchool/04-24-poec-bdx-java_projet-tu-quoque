import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCharactersComponent } from './components/features/user-characters/user-characters.component';
import { CharacterPageComponent } from './components/features/character-page/character-page.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "my-characters",
    pathMatch: "full"
  },
  {
    path: "my-characters",
    component: UserCharactersComponent
  },
  {
    path: "my-characters/:id",
    component: CharacterPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharacterManagementRoutingModule { }
