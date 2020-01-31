import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './UI/add/add.component';
import { ViewComponent } from './UI/view/view.component';
import { EditComponent } from './UI/edit/edit.component';
import { UserComponent } from './UI/user/user.component';
import { ProjectComponent } from './UI/project/project.component';




const appRoutes: Routes = [
  { path: 'view-task', 
  component: ViewComponent, 
 },
 {
  path: 'edit-task',
  component: EditComponent,
  
},
{
  path: 'Add-task',
  component: AddComponent,
  
},
{
  path: 'Add-User',
  component: UserComponent,
  
},

{
  path: 'Add-Project',
  component: ProjectComponent,
  
},



  { 
    path: '', redirectTo: 'view-task', pathMatch: 'full'
 }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
