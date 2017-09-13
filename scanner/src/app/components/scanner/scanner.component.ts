import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent {
  @ViewChild('scannerBed') scannerBed;
  @ViewChild('scannerOutput') scannerOutput;

  private bedCtx: CanvasRenderingContext2D;
  private outputCtx: CanvasRenderingContext2D;

  private bedHeight: number;
  private bedWidth: number;
  private outputHeight: number;
  private outputWidth: number;
  private n: number = 0;

  private paused: boolean = false;
  private img: HTMLImageElement;

  constructor() { }

  updateScanner(): void {
    this.bedCtx.fillStyle = 'rgba(0, 0, 200, 0.3)';

    if (!this.paused) {
      if (this.n * 10 > this.bedWidth) {
        this.n = 0;
      }

      this.bedCtx.clearRect(0, 0, this.bedWidth, this.bedHeight);

      if (this.img) {
        this.bedCtx.drawImage(this.img, 0, 0);
      }

      this.bedCtx.fillRect(10 * this.n, 0, 10, this.bedHeight);
      this.n++;
    }

    setTimeout(() => {
      this.updateScanner();
    }, 500)
  }

  fileChange(event): void {
    if (event.target.files[0]) {
      this.img = new Image();
      this.img.onload = () => {
        this.bedCtx.drawImage(this.img, 0, 0);
      }
      this.img.src = URL.createObjectURL(event.target.files[0]);
    }
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
