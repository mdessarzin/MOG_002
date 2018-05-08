import { Injectable, ElementRef} from '@angular/core';
import { LoadingController } from 'ionic-angular';
import {Observable} from 'rxjs/Rx';
import * as $ from "jquery";

@Injectable()

export class AudioStreamProvider {
	
		loadingPopup: any;
		url:string;
		stream:any;
		promise:any;
	    onloading: string;


	  	constructor(private _loadingCtrl: LoadingController){

//			el.nativeElement.style.backgroundColor = 'yellow';
	  	}
	
	 
		public playerconfigProvider(urlMedia?): Observable<boolean> {
			

			
			if(urlMedia)
				this.url = urlMedia;
			else
				this.url = "https://onefm.ice.infomaniak.ch/onefm-high.mp3"; //https://radiolac.ice.infomaniak.ch/radiolac-high.mp3
;
			
						this.stream = new Audio(this.url);


			return Observable.of(false);
		
		}
	

		public playProvider(): Observable<boolean> {
		
			
			

			$('.btPlayer').hide();
			$('.loadingPlayer').show();
			$('.playerEtat_0').hide();
			$('.playerEtat_1').hide();
			$('.playerEtat_2').show();
			
			//this.stream.play();
			


			
			/*
			this.loadingPopup = this._loadingCtrl.create({     // Crea el cargando
					spinner: 'dots',
					content: ''
				});
				*/
			//this.loadingPopup.present().then(()=>{
					this.stream.play();

									console.log('play');
    			//			console.log('the time was updated to: ' + this.currentTime);
			this.stream.onplaying = function() {
						//resolve(true);
															console.log('play2');

						$('.loadingPlayer').hide();
						$('.btPlayer').show();
						$('.playerEtat_2').hide();
						$('.playerEtat_0').hide();
						$('.playerEtat_1').show();
				  		$('.btPlayer').html('<i class="fas fa-pause-circle fa-3x"></i>');
					}
			
					this.stream.onerror = function() {
						//reject(false);
						$('.playerEtat_2').hide();
						$('.playerEtat_1').hide();
						$('.playerEtat_0').show();
						$('.btPlayer').html('<i class="fas fa-play-circle fa-3x"></i>');
						//this.loadingPopup.dismiss(); 
					}
			
			
					this.promise = new Promise((resolve,reject) => {
					//this.stream.play();
					
					//return false;
			});


			
			
			
			//return this.promise;

			//});  
			return Observable.of(false);

		}

		public pauseProvider(): Observable<boolean> {
			this.stream.pause();

			//this.stream.pause();
			//return false;
			$('.playerEtat_2').hide();
			$('.playerEtat_1').hide();
			$('.playerEtat_0').show();
			$('.btPlayer').html('<i class="fas fa-play-circle fa-3x"></i>');
			return Observable.of(false);
		}

}

