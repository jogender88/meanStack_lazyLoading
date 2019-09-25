import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddnewComponent } from './addnew/addnew.component';
import { DeletedComponent } from './deleted/deleted.component';
import { DashboardComponent } from './dashboard.component';
import { AuthGuardGuard } from '../service/auth-guard.guard';

const routes: Routes = [
    {
        path:"",
        canActivateChild:[AuthGuardGuard],
        component:DashboardComponent,
        children:[
            {
                path: "new",
                component: AddnewComponent,
            },
            {
                path: "deleted",
                component: DeletedComponent
            },
            {
                path: "lazymodule",
                loadChildren: '../lazy/lazy.module#LazyModule'
            },
        ]
    },
    {
        path:'**',
        redirectTo:'/home/user',
        canActivate:[AuthGuardGuard],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
