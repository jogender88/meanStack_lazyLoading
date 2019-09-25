import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountUpModule } from 'countup.js-angular2';
import { GetpostService } from './services/getpost.service';
import { LoginComponent } from './login/login.component';
import { httpInterceptorProvider } from './services/interceptorConstants';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule,CountUpModule
  ],
  providers: [GetpostService,httpInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
