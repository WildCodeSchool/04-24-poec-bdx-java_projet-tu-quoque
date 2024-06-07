import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableInvitationComponent } from './components/features/table-invitation/table-invitation.component';
import { userResolver } from '../../../shared/resolver/user.resolver';

const routes: Routes = [
  {
    path: "",
    redirectTo: "invitation-management",
    pathMatch: "full",
    resolve: {userResolver}
  },
  {
    path: "invitation-management",
    component: TableInvitationComponent,
    resolve: {userResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableInvitationRoutingModule { }
