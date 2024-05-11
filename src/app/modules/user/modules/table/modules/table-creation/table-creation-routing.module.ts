import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewTableComponent } from './components/features/new-table/new-table.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "new-table",
    pathMatch: "full"
  },
  {
    path: "new-table",
    component: NewTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableCreationRoutingModule { }
