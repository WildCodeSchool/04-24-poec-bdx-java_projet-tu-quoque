import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableInvitationComponent } from './components/features/table-invitation/table-invitation.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "invitation-management",
    pathMatch: "full"
  },
  {
    path: "invitation-management",
    component: TableInvitationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableInvitationRoutingModule { }
