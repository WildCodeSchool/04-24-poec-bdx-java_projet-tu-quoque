import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewTableComponent } from './components/features/new-table/new-table.component';
import { userResolver } from '../../../../../shared/resolver/user.resolver';

const routes: Routes = [
  {
    path: "",
    redirectTo: "new-table",
    pathMatch: "full",
     resolve: {user: userResolver}
  },
  {
    path: "new-table",
    component: NewTableComponent, 
    resolve: {user: userResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableCreationRoutingModule { }
