import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTablesComponent } from './components/features/user-tables/user-tables.component';
import { TablePageComponent } from './components/features/table-page/table-page.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "myTables",
    pathMatch: "full"
  },
  {
    path: "myTables",
    component: UserTablesComponent
  },
  {
    path: "myTables/:id",
    component: TablePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableManagementRoutingModule { }
