import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedTableCalendarComponent } from './components/features/shared-table-calendar/shared-table-calendar.component';

const routes: Routes = [
  {
    path: "",
    component: SharedTableCalendarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableCalendarRoutingModule { }
