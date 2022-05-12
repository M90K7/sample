import { AfterViewInit, Component, ViewChild } from '@angular/core';

import Cropper from "cropperjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  title = 'cropperjs';

  cropper!: Cropper;

  imageUrl = "/assets/pic.jpg";

  imgOutput!: string;

  ngAfterViewInit(): void {
    this.newCropper();

  }

  newCropper() {

    if (this.cropper) {
      this.cropper.clear().destroy();
    }

    const image = document.getElementById('image')! as HTMLImageElement;

    this.cropper = new Cropper(image, {
      aspectRatio: 1 / 1,
      crop: (event) => {
        // console.log(event.detail.x);
        // console.log(event.detail.y);
        // console.log(event.detail.width);
        // console.log(event.detail.height);
        // console.log(event.detail.rotate);
        // console.log(event.detail.scaleX);
        // console.log(event.detail.scaleY);

        // this.imgOutput = this.cropper.getCroppedCanvas().toDataURL('image/png');
      },
      center: true,
      preview: '.img-output',
      zoomable: true,

    });
    this.cropper.moveTo(250, 250);
  }

  crop() {
    this.imgOutput = this.cropper.getCroppedCanvas().toDataURL('image/png');
  }

  rotate() {
    this.cropper.rotate(-10);
  }

  flipX() {
    const data = this.cropper.getData();
    this.cropper.scaleX(data.scaleX * -1);
  }
  flipY() {
    const data = this.cropper.getData();
    this.cropper.scaleY(data.scaleY * -1);
  }

  uploadFile($event: any) {
    console.log($event.target.files[0]);
    this.cropper.replace(URL.createObjectURL($event.target.files[0]));
  }

  changePic() {
    this.cropper.replace("/assets/pic2.jpg");
  }

}
