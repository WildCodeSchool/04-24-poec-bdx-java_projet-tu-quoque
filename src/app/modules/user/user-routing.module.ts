import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomepageComponent } from './components/features/user-homepage/user-homepage.component';
import { AccountManagementComponent } from './components/features/account-management/account-management.component';
import { userResolver } from '../shared/resolver/user.resolver';

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
    resolve: {userResolver}
  },
  {
    path: "home",
    component: UserHomepageComponent,
    resolve: {userResolver}
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
    path: "table-invitation",
    loadChildren: () => import('./modules/table-invitation/table-invitation.module')
    .then(m => m.TableInvitationModule)
  },
  {
    path: "account-management",
    component: AccountManagementComponent,
    resolve: {userResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
