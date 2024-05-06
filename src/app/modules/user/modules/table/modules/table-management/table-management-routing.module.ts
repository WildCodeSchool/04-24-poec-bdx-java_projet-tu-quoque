import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTablesComponent } from './components/features/user-tables/user-tables.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "myTables",
    pathMatch: "full"
  },
  {
    path: "myTables",
    component: UserTablesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableManagementRoutingModule { }
