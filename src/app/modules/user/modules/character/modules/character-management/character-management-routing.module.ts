import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCharactersComponent } from './components/features/user-characters/user-characters.component';
import { CharacterPageComponent } from './components/features/character-page/character-page.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "myCharacters",
    pathMatch: "full"
  },
  {
    path: "myCharacters",
    component: UserCharactersComponent
  },
  {
    path: "myCharacters/:id",
    component: CharacterPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharacterManagementRoutingModule { }
