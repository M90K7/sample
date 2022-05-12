import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularCropperjsModule } from 'angular-cropperjs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularCropperjsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
