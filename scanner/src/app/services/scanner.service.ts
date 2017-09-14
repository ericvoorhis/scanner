import { Injectable } from '@angular/core';

@Injectable()
export class ScannerService {
  private bedCanvas: HTMLCanvasElement;
  private outputCanvas: HTMLCanvasElement;

  private bedCtx: CanvasRenderingContext2D;
  private outputCtx: CanvasRenderingContext2D;

  private n: number = 0;
  private dx: number = 0;
  private dy: number = 0;

  private paused: boolean = false;
  private img: HTMLImageElement;

  constructor() { }

  updateScanner(): void {
    this.bedCtx.fillStyle = 'rgba(255, 255, 255, 0.3)';

    if (!this.paused) {
      if (this.n > this.bedCanvas.width) {
        this.n = 0;
      }

      this.bedCtx.clearRect(0, 0, this.bedCanvas.width, this.bedCanvas.height);

      if (this.img) {
        this.bedCtx.drawImage(this.img, this.dx, this.dy);
      }

      // Right around here copy bed canvas section to output canvas
      this.outputCtx.drawImage(
        this.bedCtx.canvas,
        this.n, // the left X position to start clipping
        0, // the top Y position to start clipping
        10, // clip this width of pixels from the source
        this.bedCanvas.height, // clip this height of pixels from the source
        this.n, // the left X canvas position to start drawing the clipped sub-image
        0, // the top Y canvas position to start drawing the clipped sub-image
        10, // scale sW to dW and draw a dW wide sub-image on the canvas
        this.outputCanvas.height  // scale sH to dH and draw a dH high sub-image on the canvas
      );

      this.bedCtx.fillRect(this.n, 0, 10, this.bedCanvas.height);
      this.n = this.n + 2;
    }

    setTimeout(() => {
      this.updateScanner();
    }, 100)
  }

  moveImage(dx: number, dy: number) {
    this.dx += dx;
    this.dy += dy;
  }

  setBedCanvas(canvas: HTMLCanvasElement) {
    this.bedCanvas = canvas;
    this.bedCtx = this.bedCanvas.getContext('2d');
  }

  setOutputCanvas(canvas: HTMLCanvasElement) {
    this.outputCanvas = canvas;
    this.outputCtx = this.outputCanvas.getContext('2d');
  }

  placeImage(img: HTMLImageElement) {
    this.img = img;
    this.updateScanner();
  }

  isPaused() {
      return this.paused;
  }

  pause() {
    this.paused = true;
  }

  resume() {
    this.paused = false;
  }

}
