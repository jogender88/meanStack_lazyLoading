import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import {AddnewComponent} from './addnew/addnew.component'
import {DashboardComponent} from './dashboard.component'
import {DeletedComponent} from './deleted/deleted.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchfilterPipe } from '../services/searchfilter.pipe';
// import { FooterComponent } from './footer/footer.component';
import { AgmCoreModule } from '@agm/core';
import { CountUpModule } from 'countup.js-angular2';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    AddnewComponent,
    DeletedComponent,
    SearchfilterPipe,
    // FooterComponent
  ],

  imports: [
    CommonModule,
    DashboardRoutingModule,NgbModule,
     HttpClientModule, 
     FormsModule,
     CountUpModule, 
     ReactiveFormsModule, 
     AgmCoreModule.forRoot({
      apiKey: ''
    })
  ],
})
export class DashboardModule { }
