import { NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { VisitorHomepageModule } from './modules/visitor-homepage/visitor-homepage.module';
import { userResolver } from './modules/shared/resolver/user.resolver';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/user',
    pathMatch: 'full'
  },
  {
    path: 'character-sheet',
    loadChildren: () => import('./modules/character-sheet/character-sheet.module')
      .then(m => m.CharacterSheetModule)
  },
  {
    path: 'authentification',
    loadChildren: () => import('./modules/authentification/authentification.module')
      .then(m => m.AuthentificationModule)
  },
  {
    path: 'visitor',
    loadChildren: () => import('./modules/visitor-homepage/visitor-homepage.module')
      .then(m => m.VisitorHomepageModule)
  },
  {
    path: 'user',
    resolve: { user: userResolver },
    loadChildren: () => import('./modules/user/user.module')
      .then(m => m.UserModule),
  },
  {
    path: 'notepad',
    loadChildren: () => import('./modules/notepad/notepad.module')
      .then(m => m.NotepadModule)
  },
  {
    path: 'dice-roll',
    loadChildren: () => import('./modules/dice-roll/dice-roll.module').then(m => m.DiceRollModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
