import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ScannerService } from '../../services/scanner.service';

@Component({
  selector: 'scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements AfterViewInit {
  @ViewChild('scannerBed') scannerBed;
  @ViewChild('scannerOutput') scannerOutput;

  constructor(private scannerService: ScannerService) { }

  ngAfterViewInit() {
    if (this.scannerBed.nativeElement) {
      this.scannerService.setBedCanvas(this.scannerBed.nativeElement);
    }

    if (this.scannerOutput.nativeElement) {
      this.scannerService.setOutputCanvas(this.scannerOutput.nativeElement);
    }
  }

}
