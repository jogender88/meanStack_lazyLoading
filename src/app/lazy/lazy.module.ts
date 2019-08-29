import { NgModule,Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyRoutingModule } from './lazy-routing.module';
import { LazytestComponent } from './lazytest/lazytest.component';

@NgModule({
  imports: [
    CommonModule,
    LazyRoutingModule
  ],
  declarations: [LazytestComponent]
})
export class LazyModule { }
