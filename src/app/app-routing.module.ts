import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitorHomepageModule } from './modules/visitor-homepage/visitor-homepage.module';

const routes: Routes = [
  {path: '', redirectTo: '/visitor/home', pathMatch: 'full'},
	{ path: 'character-sheet', loadChildren: () =>  import('./modules/character-sheet/character-sheet.module').then(m  => m.CharacterSheetModule) },
  {
    path: 'authentification', 
    loadChildren: () => import('./modules/authentification/authentification.module')
    .then(m  => m.AuthentificationModule) 
  },
  {path: 'visitor',
  loadChildren: () => import('./modules/visitor-homepage/visitor-homepage.module')
  .then(m  => m.VisitorHomepageModule)
  },
  {
    path: 'user', 
    loadChildren: () => import('./modules/user/user.module')
    .then(m  => m.UserModule) 
  },
  {
    path: 'notepad',
    loadChildren: () => import('./modules/notepad/notepad.module')
    .then(m => m.NotepadModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
