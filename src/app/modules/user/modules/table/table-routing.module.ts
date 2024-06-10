import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { userResolver } from '../../../shared/resolver/user.resolver';
import { authGuard } from '../../../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: "",
    redirectTo: "management",
    pathMatch: "full",
    resolve: {user: userResolver}
  },
  {
    path: "management",
    loadChildren: () => import("./modules/table-management/table-management.module")
    .then(m => m.TableManagementModule)
  },
  {
    path: "creation",
    loadChildren: () => import("./modules/table-creation/table-creation.module")
    .then(m => m.TableCreationModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableRoutingModule { }
