import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionPageComponent } from './components/feature/connexion-page/connexion-page.component';
import { InscriptionPageComponent } from './components/feature/inscription-page/inscription-page.component';


const routes: Routes = [
  { path: 'connexion', 
  component: ConnexionPageComponent
},
  { path: 'inscription', 
  component: InscriptionPageComponent
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthentificationRoutingModule { }
