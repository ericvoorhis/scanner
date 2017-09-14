import { Injectable } from '@angular/core';

@Injectable()
export class ScannerService {
  private bedCanvas: HTMLCanvasElement;
  private outputCanvas: HTMLCanvasElement;

  private bedCtx: CanvasRenderingContext2D;
  private outputCtx: CanvasRenderingContext2D;

  private n: number = 0;

  private paused: boolean = false;
  private img: HTMLImageElement;

  constructor() { }

  updateScanner(): void {
    this.bedCtx.fillStyle = 'rgba(0, 0, 200, 0.3)';

    if (!this.paused) {
      if (this.n * 10 > this.bedCanvas.width) {
        this.n = 0;
      }

      this.bedCtx.clearRect(0, 0, this.bedCanvas.width, this.bedCanvas.height);

      if (this.img) {
        this.bedCtx.drawImage(this.img, 0, 0);
      }

      this.bedCtx.fillRect(10 * this.n, 0, 10, this.bedCanvas.height);
      this.n++;
    }

    setTimeout(() => {
      this.updateScanner();
    }, 500)
  }

  setBedCanvas(canvas: HTMLCanvasElement) {
    this.bedCanvas = canvas;
    this.bedCtx = this.bedCanvas.getContext('2d');
  }

  setOutputCanvas(canvas: HTMLCanvasElement) {
    this.outputCanvas = canvas;
    this.outputCtx = this.outputCanvas.getContext('2d');
  }

  setImage(img: HTMLImageElement) {
    this.img = img;
    this.updateScanner();
  }

}
