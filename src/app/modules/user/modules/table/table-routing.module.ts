import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    redirectTo: "management",
    pathMatch: "full"
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
