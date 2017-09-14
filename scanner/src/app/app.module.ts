import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ScannerComponent } from './components/scanner/scanner.component';
import { ImageUploadComponent } from './components/imageupload/image-upload.component';
import { ScannerService } from './services/scanner.service';

import { MaterialModule } from '@angular/material';
// import {MdCardModule, MdListModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ImageUploadComponent,
    ScannerComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    NoopAnimationsModule
  ],
  providers: [ScannerService],
  bootstrap: [
    AppComponent,
    ImageUploadComponent,
    ScannerComponent
  ]
})
export class AppModule { }
