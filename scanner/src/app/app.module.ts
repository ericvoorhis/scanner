import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ScannerComponent } from './components/scanner/scanner.component';

import {MdCardModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ScannerComponent
  ],
  imports: [
    BrowserModule,
    MdCardModule
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    ScannerComponent
  ]
})
export class AppModule { }
