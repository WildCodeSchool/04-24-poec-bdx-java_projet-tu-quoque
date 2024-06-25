import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableInvitationComponent } from './components/features/table-invitation/table-invitation.component';
import { userResolver } from '../../../shared/resolver/user.resolver';
import { authGuard } from '../../../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: "",
    redirectTo: "invitation-management",
    pathMatch: "full",
    resolve: {user: userResolver},
  },
  {
    path: "invitation-management",
    component: TableInvitationComponent,
    resolve: {user: userResolver},
    canActivate: [authGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableInvitationRoutingModule { }
