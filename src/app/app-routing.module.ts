import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './UI/add/add.component';
import { ViewComponent } from './UI/view/view.component';
import { EditComponent } from './UI/edit/edit.component';


const appRoutes: Routes = [
  { path: 'list', component: ViewComponent },
  { path: 'create', component: AddComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
