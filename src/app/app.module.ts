import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetpostService } from './services/getpost.service';
import { DeletedComponent } from './deleted/deleted.component';
import { AddnewComponent } from './addnew/addnew.component';
import { SearchfilterPipe } from './services/searchfilter.pipe';
@NgModule({
  declarations: [
    AppComponent,
    DeletedComponent,
    AddnewComponent,
    SearchfilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule
  ],
  providers: [GetpostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
