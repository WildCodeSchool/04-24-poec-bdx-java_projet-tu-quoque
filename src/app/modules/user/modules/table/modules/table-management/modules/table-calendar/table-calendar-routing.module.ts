import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedTableCalendarComponent } from './components/features/shared-table-calendar/shared-table-calendar.component';
import { userResolver } from '../../../../../../../shared/resolver/user.resolver';

const routes: Routes = [
  {
    path: "",
    component: SharedTableCalendarComponent,
     resolve: {user: userResolver}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableCalendarRoutingModule { }
