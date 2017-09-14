import { Component, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { ScannerService } from '../../services/scanner.service';

@Component({
  selector: 'scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements AfterViewInit {
  @ViewChild('scannerBed') scannerBed
  @ViewChild('scannerOutput') scannerOutput
  private mouseDown : boolean = false;
  private last: MouseEvent;

  constructor(private scannerService: ScannerService) { }

  @HostListener('mouseup')
  onMouseup() {
      this.mouseDown = false;
  }

  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    if(this.mouseDown) {
      // console.log("X: ", event.clientX - this.last.clientX);
      // console.log("Y: ", event.clientY - this.last.clientY);
      this.scannerService.moveImage(
        event.clientX - this.last.clientX,
        event.clientY - this.last.clientY
      )
      this.last = event;
    }
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(event) {
    this.mouseDown = true;
    this.last = event;
  }

  ngAfterViewInit() {
    if (this.scannerBed.nativeElement) {
      this.scannerService.setBedCanvas(this.scannerBed.nativeElement);
    }

    if (this.scannerOutput.nativeElement) {
      this.scannerService.setOutputCanvas(this.scannerOutput.nativeElement);
    }
  }

  scannerIsPaused() {
    return this.scannerService.isPaused();
  }

  onPlayPauseClick() {
    if (this.scannerService.isPaused()) {
      this.scannerService.resume();
    } else {
      this.scannerService.pause();
    }
  }
}
