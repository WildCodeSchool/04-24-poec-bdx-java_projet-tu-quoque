import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTablesComponent } from './components/features/user-tables/user-tables.component';
import { TablePageComponent } from './components/features/table-page/table-page.component';
import { TableNewPlayerComponent } from './components/features/table-new-player/table-new-player.component';
import { CharactersToAcceptComponent } from './components/features/characters-to-accept/characters-to-accept.component';
import { TableNewDrawingComponent } from './components/features/table-new-drawing/table-new-drawing.component';
import { userResolver } from '../../../../../shared/resolver/user.resolver';

const routes: Routes = [
  {
    path: "",
    redirectTo: "my-tables",
    pathMatch: "full",
    resolve: {userResolver}
  },
  {
    path: "my-tables",
    component: UserTablesComponent, 
    resolve: {userResolver}
  },
  {
    path: "my-tables/:id",
    component: TablePageComponent, 
    resolve: {userResolver}
  },
  {
    path: "my-tables/:id/new-player",
    component: TableNewPlayerComponent, 
    resolve: {userResolver}
  },
  {
    path: "my-tables/:id/accept-characters",
    component: CharactersToAcceptComponent, 
    resolve: {userResolver}
  },
  {
    path: "my-tables/:id/shared-calendar",
    loadChildren: () => import('./modules/table-calendar/table-calendar.module')
    .then(m => m.TableCalendarModule)
  },
  {
    path: "my-tables/:id/new-drawing",
    component: TableNewDrawingComponent,
    resolve: {userResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableManagementRoutingModule { }
