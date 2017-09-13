import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent {

  @ViewChild('scannerBed') scannerBed
  @ViewChild('scannerOutput') scannerOutput;

  constructor() { }

 ngAfterViewInit() {
   console.log(this.scannerBed.nativeElement);
   console.log(this.scannerOutput.nativeElement);
 }

}
