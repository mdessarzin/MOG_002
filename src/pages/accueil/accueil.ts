import { Component, ViewChild, Injectable } from '@angular/core';
import { IonicPage, NavController, Platform, Content, PopoverController, LoadingController } from 'ionic-angular';
import { ScrollHideConfig } from '../../directives/scroll-hide/scroll-hide';
import * as $ from "jquery";
import { AudioStreamProvider } from '../../providers/audio-stream/audio-stream';
import { MusicControls } from '@ionic-native/music-controls';
import { Http } from '@angular/http';
import { Media, MediaObject } from '@ionic-native/media';
import { map } from 'rxjs/operators';

//import {Http, Response} from "@angular/http";
//import {Observable} from 'rxjs/Rx';
//import 'rxjs/add/operator/catch';
//import 'rxjs/Rx';

@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html'
})
export class AccueilPage {
	private loadingPopup: any;
    artist: string;
    cover: string;
    track: string;
    date: string;
    cat: string;
    live: string;
    animateClass: any;
    params: any = {};
    data: any = {};
    pushPage: any;
    buttonIcon: string = 'ios-play';
 	posts: any;
  	fakeUsers: Array<any> = new Array(7);
	footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  	headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };

  constructor(
		public navCtrl: NavController,
		public _player: AudioStreamProvider,
		public http: Http, 
		public loadingCtrl: LoadingController,
		public musicControls: MusicControls,
		//private iab: InAppBrowser,
		 public plt: Platform
		//private ga: GoogleAnalytics
	){
			

			
		if(localStorage.player == 'play'){
            this.buttonIcon = "ios-pause";

        }
        else
        {
            this.buttonIcon = "ios-play";
        }
      
		$.ajaxSetup({ cache: false });
		$.getJSON('https://www.mediaone-digital.ch/cache/onefm.json', function(data){
				   					   $('#songArtist').html(data.live[0].interpret);
					   $('#songTitle').html(data.live[0].title);
				   $('#songCover').attr('src',data.live[0].imageURL);
		});
			
  }
	//Prépation de la fonction de chargement
	private loading(){
		 setTimeout(() => {
			  fetch('https://www.radiolac.ch/wp-json/wp/v2/posts?_embed')
				.then(response => response.json())
				.then(data => {
				  console.log(data);
				  this.posts = data;
				});
			}, 0);
	}
	//Chargement du flux JSON
    ionViewDidLoad() {
		this.loading();
	}
settingMusicControl(track,artist,cover){
	
	
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
               this._player.pauseProvider();
               this.musicControls.listen(); 
               this.musicControls.updateIsPlaying(false);
               break;
            case 'music-controls-play':
               // Do something
               console.log('music play');
               this._player.playProvider();
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

	
startAudio() {      
   // if (this.plt.is('cordova')) {
     
        if(localStorage.player == 'play'){
                this._player.pauseProvider();
                //this._musicControls.updateIsPlaying(true);
			    this.musicControls.listen();
				this.musicControls.updateIsPlaying(false);
			
                localStorage.setItem("player", "stop");
                this.buttonIcon = "ios-play";
        }
        else
        {
			
			

			
			
			   setInterval(() => {      
          console.log('timer');
				  
				   setTimeout(() => {
			  fetch('https://www.mediaone-digital.ch/cache/onefm.json')
				.then(response => response.json())
				.then(data => {
				  console.log(data);
				  
				  
				  if(this.live == data.live[0].interpret){
                                //
                            }
                            else{
                                // this.params.data = data;
                              	this.settingMusicControl($('#songTitle').html(), $('#songArtist').html(), $('#songCover').attr('src'));
                                this.live = data.live[0].interpret;
							$('#songArtist').html(data.live[0].interpret);
							$('#songTitle').html(data.live[0].title);
							$('#songCover').attr('src',data.live[0].imageURL);								
                            }
				  
				  
				//  this.posts = data;
				});
			}, 0);
				   
				   
				   

							/*
							$.getJSON('https://www.mediaone-digital.ch/cache/onefm.json', function(data,this){


							$('#songArtist').html(data.live[0].interpret);
							$('#songTitle').html(data.live[0].title);
							$('#songCover').attr('src',data.live[0].imageURL);

							if(this.live == data.live[0].interpret){
							//
							}
							else{
							// this.params.data = data;

							this.live = data.live[0].interpret;
							}

							});
							//you can call function here
							this.settingMusicControl($('#songTitle').html(), $('#songArtist').html(), $('#songCover').attr('src'));

			  */
			   },15000);
			
			
			
		
			
			

			
			localStorage.setItem("player", "play");
			this.buttonIcon = "ios-pause";

			console.log('Play Button clicked');
			this._player.playProvider();
						    this.musicControls.listen();
				this.musicControls.updateIsPlaying(true);

	    	
			}
	
}
// }
	}
	