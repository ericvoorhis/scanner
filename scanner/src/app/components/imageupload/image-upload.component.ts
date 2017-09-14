import { Component } from '@angular/core';
import { ScannerService } from '../../services/scanner.service';

@Component({
  selector: 'image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
  constructor(private scannerService: ScannerService) { }

  private img: HTMLImageElement;

  fileChange(event): void {
    if (event.target.files[0]) {
      this.img = new Image();
      this.img.onload = () => {
        this.scannerService.setImage(this.img);
      }
      this.img.src = URL.createObjectURL(event.target.files[0]);
    }
  }

}
