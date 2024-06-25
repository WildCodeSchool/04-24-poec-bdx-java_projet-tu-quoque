import { NgModule } from '@angular/core';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { VisitorHomepageModule } from './modules/visitor-homepage/visitor-homepage.module';
import { userResolver } from './modules/shared/resolver/user.resolver';
import { authGuard } from './modules/shared/guards/auth.guard';
import { ErrorPageComponent } from './modules/navigation/components/features/error/error-page/error-page.component';


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
    canActivate: [authGuard],
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
  },
  {
    path: '**',
    component: ErrorPageComponent,
    resolve: {user: userResolver},
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
