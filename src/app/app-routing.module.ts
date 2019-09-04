import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from './service/auth-guard.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"home/user",loadChildren:'./dashboard/dashboard.module#DashboardModule',
  canActivate:[AuthGuardGuard]
},
  {path:"**",redirectTo:"/login",pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
