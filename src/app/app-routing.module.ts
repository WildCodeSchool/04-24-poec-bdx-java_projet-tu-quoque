import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authentification', 
    loadChildren: () =>  import('./modules/authentification/authentification.module').then(m  => m.AuthentificationModule) 
  },
  {
    path: 'user', 
    loadChildren: () =>  import('./modules/user/user.module').then(m  => m.UserModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
