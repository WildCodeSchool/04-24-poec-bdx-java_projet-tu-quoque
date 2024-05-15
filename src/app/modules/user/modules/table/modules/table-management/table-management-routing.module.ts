import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTablesComponent } from './components/features/user-tables/user-tables.component';
import { TablePageComponent } from './components/features/table-page/table-page.component';
import { TableNewPlayerComponent } from './components/features/table-new-player/table-new-player.component';
import { CharactersToAcceptComponent } from './components/features/characters-to-accept/characters-to-accept.component';
import { TableNewDrawingComponent } from './components/features/table-new-drawing/table-new-drawing.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "my-tables",
    pathMatch: "full"
  },
  {
    path: "my-tables",
    component: UserTablesComponent
  },
  {
    path: "my-tables/:id",
    component: TablePageComponent
  },
  {
    path: "my-tables/:id/new-player",
    component: TableNewPlayerComponent
  },
  {
    path: "my-tables/:id/accept-characters",
    component: CharactersToAcceptComponent
  },
  {
    path: "my-tables/:id/new-drawing",
    component: TableNewDrawingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableManagementRoutingModule { }
