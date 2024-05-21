import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisitorHomepageComponent } from './components/feature/visitor-homepage/visitor-homepage.component';


const routes: Routes = [
  { path: 'home', 
  component: VisitorHomepageComponent
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitorHomepageRoutingModule { }
