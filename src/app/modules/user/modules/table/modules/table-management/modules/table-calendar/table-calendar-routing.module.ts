import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedTableCalendarComponent } from './components/features/shared-table-calendar/shared-table-calendar.component';
import { userResolver } from '../../../../../../../shared/resolver/user.resolver';
import { authGuard } from '../../../../../../../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: "",
    component: SharedTableCalendarComponent,
     resolve: {user: userResolver},
     canActivate: [authGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableCalendarRoutingModule { }
