import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';

@Injectable()
export class AudioStreamProvider {
  loadingPopup: any;
  url:string;
  stream:any;
  promise:any;

  constructor(
    private _toast: ToastController,
    private _loadingCtrl: LoadingController
  ) {
    
    this.url = "https://onefm.ice.infomaniak.ch/onefm-high.mp3";
    this.stream = new Audio(this.url);
  }

  playProvider() {
    this.stream.play();

   this.loadingPopup = this._loadingCtrl.create({     // Crea el cargando
                spinner: 'dots',
                content: ''
            });
   this.loadingPopup.present();

    this.promise = new Promise((resolve,reject) => {
      this.stream.addEventListener('playing', () => {
        resolve(true);
        this.loadingPopup.dismiss(); 
      });
      this.stream.addEventListener('error', () => {
        reject(false);
        this.loadingPopup.dismiss(); 
      });
    });
    
   return this.promise;
 };
 
 pauseProvider() {
   this.stream.pause();
 };

}
