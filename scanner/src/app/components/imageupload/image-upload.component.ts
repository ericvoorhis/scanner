import { Component, ViewChild } from '@angular/core';
import { ScannerService } from '../../services/scanner.service';

@Component({
  selector: 'image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
  @ViewChild('file') fileInput
  private img: HTMLImageElement;

  constructor(private scannerService: ScannerService) { }

  fileChange(event): void {
    if (event.target.files[0]) {
      this.img = new Image();
      this.img.onload = () => {
        this.scannerService.placeImage(this.img);
      }
      this.img.src = URL.createObjectURL(event.target.files[0]);
      // Also update input caption to include file name
    }
  }

  onClick(event): void {
    this.fileInput.nativeElement.click();
  }

}
