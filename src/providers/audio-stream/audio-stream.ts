import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class AudioStreamProvider {
		loadingPopup: any;
		url:string;
		stream:any;
		promise:any;

	  	constructor(private _loadingCtrl: LoadingController){

			this.url = "https://onefm.ice.infomaniak.ch/onefm-high.mp3";
			this.stream = new Audio(this.url);
	  	}

		public playProvider(): Observable<any> {

			this.loadingPopup = this._loadingCtrl.create({     // Crea el cargando
					spinner: 'dots',
					content: ''
				});


			this.loadingPopup.present().then(()=>{

			this.promise = new Promise((resolve,reject) => {
					this.stream.play();
					this.stream.addEventListener('playing', () => {
					resolve(true);
					if(this.loadingPopup){ this.loadingPopup.dismiss(); this.loadingPopup = null; }
					});
					this.stream.addEventListener('error', () => {
						reject(false);
						this.loadingPopup.dismiss(); 
					});
					return false;
			});

			return this.promise;

			});  
			return false;

		}
	

		public pauseProvider(): Observable<any> {
			this.stream.pause();
			return false;
		}

}

