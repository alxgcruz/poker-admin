import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, Input, NgZone, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import jsQR from 'jsqr';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { IPlayer } from 'src/app/api/models';

const PrimeNgModules = [
  ButtonModule,
  InputTextModule,
  InputGroupModule,
  InputGroupAddonModule,
  DialogModule
];

@Component({
  selector: 'app-scan-player',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PrimeNgModules
  ],
  templateUrl: './scan-player.component.html',
  styleUrl: './scan-player.component.scss'
})
export class ScanPlayerComponent {

  @Input() player: IPlayer;
  scanDialog: boolean = false;

  @ViewChild('video', { static: true }) videoElm: ElementRef;
  @ViewChild('canvas', { static: true }) canvasElm: ElementRef;

  videoStart = false;
  medias: MediaStreamConstraints = {
    audio: false,
    video: false,
  };

  private ngZone = inject(NgZone);

  openScan() {
    this.scanDialog = true;
    this.startVideo();
  }

  startVideo() {
    this.medias.video = true;
    navigator.mediaDevices.getUserMedia(this.medias).then(
      (localStream: MediaStream) => {
        this.videoElm.nativeElement.srcObject = localStream;
        this.videoStart = true;
        this.checkImage();
      }
    ).catch(
      error => {
        console.error(error);
        this.videoStart = false;
      }
    );
  }

  checkImage() {
    const WIDTH = this.videoElm.nativeElement.clientWidth;
    const HEIGHT = this.videoElm.nativeElement.clientHeight;
    if(WIDTH === 0 || HEIGHT === 0) {
      return;
    }
    this.canvasElm.nativeElement.width = WIDTH;
    this.canvasElm.nativeElement.height = HEIGHT;

    const ctx = this.canvasElm.nativeElement.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D;

    ctx.drawImage(this.videoElm.nativeElement, 0, 0, WIDTH, HEIGHT);
    const imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT);
    const code = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: "dontInvert" })

    if (code) {
      this.player.codigo = code.data;
      console.log(code.data);
      this.stopVideo();
    } else {
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => { this.checkImage(); }, 100)
      });
    }
  }

  stopVideo() {
    this.medias.video = false;
    this.videoElm.nativeElement.srcObject.getVideoTracks()[0].enabled = false;
    this.videoElm.nativeElement.srcObject.getVideoTracks()[0].stop();
    this.videoStart = false;
    this.scanDialog = false;
  }

}
