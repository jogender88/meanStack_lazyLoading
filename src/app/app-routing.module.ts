import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddnewComponent } from './addnew/addnew.component';
import { DeletedComponent } from './deleted/deleted.component';


const routes: Routes = [
  {path:"",redirectTo:"/home",pathMatch:'full'},
  {path:"home",component:AddnewComponent},
  {path:"deleted",component:DeletedComponent},
  {path:"lazymodule",loadChildren:'./lazy/lazy.module#LazyModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponent=[AddnewComponent,DeletedComponent];
