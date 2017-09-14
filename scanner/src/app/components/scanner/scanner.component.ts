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

  private img: HTMLImageElement;

  constructor(private scannerService: ScannerService) { }

  fileChange(event): void {
    if (event.target.files[0]) {
      this.img = new Image();
      this.img.onload = () => {
        this.scannerService.setImage(this.img);
      }
      this.img.src = URL.createObjectURL(event.target.files[0]);
    }
  }

  ngAfterViewInit() {
    if (this.scannerBed.nativeElement) {
      this.scannerService.setBedCanvas(this.scannerBed.nativeElement);
    }

    if (this.scannerOutput.nativeElement) {
      this.scannerService.setOutputCanvas(this.scannerBed.nativeElement);
    }
  }

}
