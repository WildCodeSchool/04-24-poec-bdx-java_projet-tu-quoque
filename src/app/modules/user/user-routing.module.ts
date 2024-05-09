import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomepageComponent } from './components/features/user-homepage/user-homepage.component';
import { AccountManagementComponent } from './components/features/account-management/account-management.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: UserHomepageComponent
  },
  {
    path: "characters", 
    loadChildren: () => import('./modules/character/character.module')
    .then(m => m.CharacterModule)
  },
  {
    path: "tables",
    loadChildren: () => import('./modules/table/table.module')
    .then(m => m.TableModule)
  },
  {
    path: "account-management",
    component: AccountManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
