import { StreamingMedia, StreamingVideoOptions, StreamingAudioOptions } from '@ionic-native/streaming-media';
import { Component, ViewChild, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Content, PopoverController, LoadingController, ViewController, ModalController } from 'ionic-angular';
import * as $ from "jquery";
import { AudioStreamProvider } from '../../providers/audio-stream/audio-stream';
import { MusicControls } from '@ionic-native/music-controls';
import { Http } from '@angular/http';
import { Media, MediaObject } from '@ionic-native/media';
import { map } from 'rxjs/operators';
/**
 * Generated class for the PlayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */



@IonicPage()
@Component({
  selector: 'page-player',
  templateUrl: 'player.html',
})
export class PlayerPage {
typeplayer: any;

	private loadingPopup: any;
    artist: string;
    cover: string;
    track: string;
    date: string;
    titreplayer: string;
    live: string;
	onplaying: string;
	durations: any = -1;
  duration_string: string;
  positions: any = 0;
	
  constructor(
		public navCtrl: NavController,
	 	private navParams: NavParams,
		public viewCtrl: ViewController,
		private streamingMedia: StreamingMedia,	  
		public _player: AudioStreamProvider,
		public http: Http, 
		public loadingCtrl: LoadingController,
		public musicControls: MusicControls,
		public plt: Platform
		){
   		
			
	 this.typeplayer = 'audio';
			
			
  }

  ngAfterViewInit() {

	  if(localStorage.type_player == 'live'){
			this.titreplayer = 'Direct';
        }
        else
        {
			this.titreplayer = 'Podcast';
			$('.songArtist').html(localStorage.podcast_title);
			$('.songTitle').html(localStorage.podcast_category);
			$('.songCover').attr('src',localStorage.podcast_cover);
        }

	  
	  
	  	let self = this;
	  
	  this.durations = this._player.stream.duration;
	  
	  	this._player.stream.ontimeupdate = function() {
    		console.log('the time was updated to: ' + this.currentTime);
			
			self.positions = this.currentTime;
			
	}
	  
	  
	  
	  
  }

  	startVideo() {
		
		 this._player.pauseProvider();
			    this.musicControls.listen();
				this.musicControls.updateIsPlaying(false);
				this.onplaying = '0';
                localStorage.setItem("player", "stop");
                $('.btPlayer').html('<i class="fas fa-play-circle fa-3x"></i>');
		
    let options: StreamingVideoOptions = {
		
      successCallback: () => { this.typeplayer = 'audio'; },
      errorCallback: (e) => { console.log('Error: ', e) }
     // orientation: 'landscape'
    }; 
    // http://www.sample-videos.com/
    this.streamingMedia.playVideo('https://livevideo.infomaniak.com/streaming/livecast/lfmmd/playlist.m3u8', options);
  }
	
  private dismiss() {
    this.viewCtrl.dismiss();
  }
	
slideStart() {
	this._player.stream.pause();
    console.log(`Start`);
}
	
slideEnd() {
	this._player.stream.currentTime = this.positions;

	
	this._player.stream.play();
    console.log("End: value: "+this.positions);
}
	
	
  ionViewDidLoad() {
	 if(localStorage.player == 'play'){
           // this.buttonIcon = "ios-pause";
			$('.btPlayer').html('<i class="fas fa-pause-circle fa-3x"></i>');
			this.onplaying = '1';

        }
        else
        {
            //this.buttonIcon = "ios-play";
			$('.btPlayer').html('<i class="fas fa-play-circle fa-3x"></i>');
			this.onplaying = '0';
        }
      
		$.ajaxSetup({ cache: false });
		$.getJSON('https://www.mediaone-digital.ch/cache/radiolac.json', function(data){
			
				  if(localStorage.type_player == 'live'){
						$('.songArtist').html(data.live[0].interpret);
						$('.songTitle').html(data.live[0].title);
						$('.songCover').attr('src',data.live[0].imageURL);
					}
					else
					{
						//
					}

		});
    console.log('ionViewDidLoad PlayerPage');
  }
	
	settingMusicControl(track,artist,cover){
	
	if (this.plt.is('cordova')) {
	
    this.musicControls.destroy(); // it's the same with or without the destroy 
    this.musicControls.create({
      track       : track,        // optional, default : ''
      artist      : artist,                       // optional, default : ''
      cover       : cover,      // optional, default : nothing
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
      album       : '',     // optional, default: ''
      duration : 0, // optional, default: 0
      elapsed : 0, // optional, default: 0
    
      // Android only, optional
      // text displayed in the status bar when the notific\ation (and the ticker) are updated
      ticker    : 'Now playing'
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
               this._player.pauseProvider();
               this.musicControls.listen(); 
               this.musicControls.updateIsPlaying(false);
				  $('.btPlayer').html('<i class="fas fa-play-circle fa-3x"></i>');
				  this.onplaying = '0';
               break;
            case 'music-controls-play':
               // Do something
               console.log('music play');
               this._player.playProvider();
               this.musicControls.listen(); 
               this.musicControls.updateIsPlaying(true);
				  $('.btPlayer').html('<i class="fas fa-pause-circle fa-3x"></i>');
				  this.onplaying = '1';
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
  }

	
startAudio() {      
  // if (this.plt.is('cordova')) {
     
        if(localStorage.player == 'play'){
                this._player.pauseProvider();
			    this.musicControls.listen();
				this.musicControls.updateIsPlaying(false);
				this.onplaying = '0';
                localStorage.setItem("player", "stop");
                $('.btPlayer').html('<i class="fas fa-play-circle fa-3x"></i>');
        }
        else
        {
			
			

			
			
			   setInterval(() => {      
          console.log('timer');
				  
				   setTimeout(() => {
			  fetch('https://www.mediaone-digital.ch/cache/radiolac.json')
				.then(response => response.json())
				.then(data => {
				  console.log(data);
				  if(this.live == data.live[0].interpret){
                                //
                            }
                            else{
								
								  if(localStorage.type_player == 'live'){
										this.settingMusicControl($('.songTitle').html(), $('.songArtist').html(), $('.songCover').attr('src'));
										this.live = data.live[0].interpret;
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
			
			
			
		
			
			

			
			localStorage.setItem("player", "play");
			//this.buttonIcon = "ios-pause";
			$('.btPlayer').html('<i class="fas fa-pause-circle fa-3x"></i>');
			//$('.btPlayer').html('<ion-spinner name="crescent"></ion-spinner>');
			
			this.onplaying = '1';
			console.log('Play Button clicked');
			this._player.playerconfigProvider();
			this._player.playProvider();
						    this.musicControls.listen();
				this.musicControls.updateIsPlaying(true);

			      
			
				//	if(localStorage.firstclickonplayer == 'oui'){
							this.settingMusicControl($('.songTitle').html(), $('.songArtist').html(), $('.songCover').attr('src'));
				//			                localStorage.setItem("firstclickonplayer", "non");

						
				//	}
	    	
			}
	
//}
 	
}

}
