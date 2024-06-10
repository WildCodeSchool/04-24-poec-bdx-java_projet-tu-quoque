import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SheetPageComponent } from './pages/sheet-page/sheet-page.component';
import { userResolver } from '../shared/resolver/user.resolver';
import { sheetGuard } from '../shared/guards/sheet.guard';
import { authGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: ":id",
    component: SheetPageComponent,
    resolve: { user: userResolver },
    canActivate: [sheetGuard, authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharacterSheetRoutingModule { }
