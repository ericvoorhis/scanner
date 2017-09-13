import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent {
  @ViewChild('scannerBed') scannerBed
  @ViewChild('scannerOutput') scannerOutput;

  public bedCtx;
  public outputCtx;

  private bedHeight: number;
  private bedWidth: number;
  private outputHeight: number;
  private outputWidth: number;
  private n: number = 0;

  private paused: boolean = false;
  constructor() { }

  updateScanner(): void {
    this.bedCtx.fillStyle = 'rgba(0, 0, 200, 0.3)';

    if (this.paused)
      return;

    if (this.n * 10 > this.bedWidth) {
      this.n = 0;
    }

    this.bedCtx.clearRect(0, 0, this.bedWidth, this.bedHeight);
    this.bedCtx.fillRect(10 * this.n, 0, 10, this.bedHeight);
    this.n++;

    setTimeout(() => {
      this.updateScanner();
    }, 500)
  }

  ngAfterViewInit() {
    if (this.scannerBed.nativeElement) {
      this.bedCtx = this.scannerBed.nativeElement.getContext('2d');
      this.bedHeight = this.scannerBed.nativeElement.height;
      this.bedWidth = this.scannerBed.nativeElement.width;
      this.updateScanner();
    }

    if (this.scannerOutput.nativeElement) {
      this.outputCtx = this.scannerOutput.nativeElement.getContext('2d');
      this.outputHeight = this.scannerOutput.nativeElement.height;
      this.outputWidth = this.scannerOutput.nativeElement.width;
    }
  }

}
