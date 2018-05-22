import { Injectable, ElementRef} from '@angular/core';
import { LoadingController } from 'ionic-angular';
import {Observable} from 'rxjs/Rx';
import * as $ from "jquery";
import { Media, MediaObject } from '@ionic-native/media';
import { MusicControls } from '@ionic-native/music-controls';

@Injectable()

export class AudioStreamProvider {
	
		loadingPopup: any;
		url:string;
//		stream:any;
	stream: MediaObject = null; //consider changing this to musicfile and all further instances to avoid conflict in the future

		promise:any;
	    onloading: string;
mediaTimer: any;
    live: string;
artist: string;
    cover: string;
	title: string;
	
	  	constructor(private _loadingCtrl: LoadingController, public musicControls: MusicControls, public media: Media){

//			el.nativeElement.style.backgroundColor = 'yellow';
	  	}
	
	


		public settingMusicControl(title,artist,cover){
			this.musicControls.destroy(); // it's the same with or without the destroy 
			this.musicControls.create({
			  track       : 'Test track',        // optional, default : ''
			  artist      : 'test artist',                       // optional, default : ''
			  cover       : '',      // optional, default : nothing
			  // cover can be a local path (use fullpath 'file:///storage/emulated/...', or only 'my_image.jpg' if my_image.jpg is in the www folder of your app)
			  //           or a remote url ('http://...', 'https://...', 'ftp://...')
			  isPlaying   : true,                         // optional, default : true
			  dismissable : true,                         // optional, default : false

			  // hide previous/next/close buttons:
			  hasPrev   : false,      // show previous button, optional, default: true
			  hasNext   : false,      // show next button, optional, default: true
			  hasClose  : true,       // show close button, optional, default: false
			  hasSkipForward : false,  // show skip forward button, optional, default: false
			  hasSkipBackward : false, // show skip backward button, optional, default: false
			  skipForwardInterval: 15, // display number for skip forward, optional, default: 0
			  skipBackwardInterval: 15, // display number for skip backward, optional, default: 0
			// iOS only, optional
			  album       : 'test album',     // optional, default: ''
			  duration : 0, // optional, default: 0
			  elapsed : 0, // optional, default: 0

			  // Android only, optional
			  // text displayed in the status bar when the notific\ation (and the ticker) are updated
			  ticker    : 'Now playing test'
			 });
			 this.musicControls.subscribe().subscribe((action) => {
			  console.log('action', action);
				  const message = JSON.parse(action).message;
				  console.log('message', message);
				  switch(message) {
					case 'music-controls-next':
					   // Do something
					   break;
					case 'music-controls-previous':
					   // Do something
					   break;
					case 'music-controls-pause':
					   // Do something
					   console.log('music pause');
					   this.stream.pause();
					   this.musicControls.listen(); 
					   this.musicControls.updateIsPlaying(false);
					   break;
					case 'music-controls-play':
					   // Do something
					   console.log('music play');
					   this.stream.play();
					   this.musicControls.listen(); 
					   this.musicControls.updateIsPlaying(true);
					   break;
					case 'music-controls-destroy':
					   // Do something
					   break;
					// External controls (iOS only)
					case 'music-controls-toggle-play-pause' :
					  // Do something
					  break;
					case 'music-controls-seek-to':
					  // Do something
					  break;
					case 'music-controls-skip-forward':
					  // Do something
					  break;
					case 'music-controls-skip-backward':
					  // Do something
					  break;

					  // Headset events (Android only)
					  // All media button events are listed below
					case 'music-controls-media-button' :
						// Do something
						break;
					case 'music-controls-headset-unplugged':
						// Do something
						break;
					case 'music-controls-headset-plugged':
						// Do something
						break;
					default:
						break;
				  }
			});
			this.musicControls.listen(); // activates the observable above
			this.musicControls.updateIsPlaying(true);
		  }

	
	 
		public playerconfigProvider(urlMedia?): Observable<boolean> {
			

			
			
			if(urlMedia)
			{
				this.url = urlMedia;
				 localStorage.setItem("type_player", "replay");
			}
			else
			{
				this.url = "https://radiolac.ice.infomaniak.ch/radiolac-high.mp3"; //https://radiolac.ice.infomaniak.ch/radiolac-high.mp3
				localStorage.setItem("type_player", "live");
				
				
				
				
			}
			
			this.stream = this.media.create(this.url);
			
			return Observable.of(false);
		
		}
	

		public playProvider(): Observable<boolean> {
		
			setInterval(() => {      
				  
					  setTimeout(() => {
						  fetch('https://www.mediaone-digital.ch/cache/radiolac.json')
							.then(response => response.json())
							.then(data => {
							  console.log('playlist:'+data);
							  if(this.live == data.live[0].interpret){
											//
										}
										else{
											this.settingMusicControl($('.songTitle').html(), $('.songArtist').html(), $('.songCover').attr('src'));
											this.live = data.live[0].interpret;
											if(localStorage.type_player == 'live'){
												$('.songArtist').html(data.live[0].interpret);
												$('.songTitle').html(data.live[0].title);
												$('.songCover').attr('src',data.live[0].imageURL);
											}
											else
											{
												//
											}
										}

							});
						}, 0);

			},15000);

			

			$('.btPlayer').hide();
			$('.loadingPlayer').show();
			$('.playerEtat_0').hide();
			$('.playerEtat_1').hide();
			$('.playerEtat_2').show();

			this.stream.play();
			this.settingMusicControl($('.songTitle').html(), $('.songArtist').html(), $('.songCover').attr('src'));
			console.log('play');
			localStorage.setItem("player", "play");

			this.stream.onStatusUpdate.subscribe(status => 
			{

				console.log(JSON.stringify(status));
		 
		 
				if (status.toString()=="2") { //player start
						$('.loadingPlayer').hide();
						$('.btPlayer').show();
						$('.playerEtat_2').hide();
						$('.playerEtat_0').hide();
						$('.playerEtat_1').show();
						$('.btPlayer').html('<i class="fas fa-pause-circle fa-3x"></i>');
				}

				if (status.toString()=="4") { // player end running
								$('.playerEtat_2').hide();
								$('.playerEtat_1').hide();
								$('.playerEtat_0').show();
								$('.btPlayer').html('<i class="fas fa-play-circle fa-3x"></i>');
					if (this.mediaTimer !=null) {
						//clearInterval(this.mediaTimer);    // (*) don t do clearInterval here, or your ionic will not work, see below
						//TODO here : handle html, remove "playing" message
					}
				}

    }); 

    this.stream.onSuccess.subscribe(() => 
        { 
       console.log(" > onSuccess complete");
    });

    this.stream.onError.subscribe(error => 
        {
        console.log(" > onError="+error); 
						$('.playerEtat_2').hide();
						$('.playerEtat_1').hide();
						$('.playerEtat_0').show();
						$('.btPlayer').html('<i class="fas fa-play-circle fa-3x"></i>');
        //clearInterval(this.mediaTimer);  (*) don t do clearInterval here, or your ionic will not work, see below
    });
			
			//return this.promise;

			//});  
			return Observable.of(false);

		}

	public pauseProvider(): Observable<boolean> {
			this.stream.pause();
			this.musicControls.listen();
			this.musicControls.updateIsPlaying(false);
			//this.stream.pause();
			//return false;
			$('.playerEtat_2').hide();
			$('.playerEtat_1').hide();
			$('.playerEtat_0').show();
			$('.btPlayer').html('<i class="fas fa-play-circle fa-3x"></i>');
			return Observable.of(false);
		}

}

