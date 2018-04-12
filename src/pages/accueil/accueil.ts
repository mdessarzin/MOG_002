import { Component, ViewChild, Injectable } from '@angular/core';
import { IonicPage, NavController, Platform, Content, PopoverController, LoadingController } from 'ionic-angular';
import { ScrollHideConfig } from '../../directives/scroll-hide/scroll-hide';
import * as $ from "jquery";
import { AudioStreamProvider } from '../../providers/audio-stream/audio-stream';
import { MusicControls } from '@ionic-native/music-controls';
import { Http } from '@angular/http';

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
    title: string;
    image: string;
    text: string;
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
				   $('#songTitle').html(data.live[0].interpret+'<br>'+data.live[0].title);
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

startAudio() {      
    if (this.plt.is('cordova')) {
      alert('oui');
   
        if(localStorage.player == 'play'){
                this._player.pauseProvider();
                //this._musicControls.updateIsPlaying(true);
                localStorage.setItem("player", "stop");
                this.buttonIcon = "ios-play";
        }
        else
        {
			
			$.getJSON('https://www.mediaone-digital.ch/cache/onefm.json', function(data){
				   $('#songTitle').html(data.live[0].interpret+'<br>'+data.live[0].title);
				   $('#songCover').attr('src',data.live[0].imageURL);
			
			});
			
	

			localStorage.setItem("player", "play");
			this.buttonIcon = "ios-pause";

			console.log('Play Button clicked');
			this._player.playProvider();

			
			
			
			
			
			this.musicControls.create({
  track       : 'Time is Running Out',        // optional, default : ''
  artist      : 'Muse',                       // optional, default : ''
  cover       : 'albums/absolution.jpg',      // optional, default : nothing
  // cover can be a local path (use fullpath 'file:///storage/emulated/...', or only 'my_image.jpg' if my_image.jpg is in the www folder of your app)
  //           or a remote url ('http://...', 'https://...', 'ftp://...')
  isPlaying   : true,                         // optional, default : true
  dismissable : true,                         // optional, default : false

  // hide previous/next/close buttons:
  hasPrev   : false,      // show previous button, optional, default: true
  hasNext   : false,      // show next button, optional, default: true
  hasClose  : true,       // show close button, optional, default: false

// iOS only, optional
  album       : 'Absolution',     // optional, default: ''
  duration : 60, // optional, default: 0
  elapsed : 10, // optional, default: 0
  hasSkipForward : true,  // show skip forward button, optional, default: false
  hasSkipBackward : true, // show skip backward button, optional, default: false
  skipForwardInterval: 15, // display number for skip forward, optional, default: 0
  skipBackwardInterval: 15, // display number for skip backward, optional, default: 0
  hasScrubbing: false, // enable scrubbing from control center and lockscreen progress bar, optional

  // Android only, optional
  // text displayed in the status bar when the notification (and the ticker) are updated, optional
  ticker    : 'Now playing "Time is Running Out"',
  // All icons default to their built-in android equivalents
 // The supplied drawable name, e.g. 'media_play', is the name of a drawable found under android/res/drawable* folders
  playIcon: 'media_play',
  pauseIcon: 'media_pause',
  prevIcon: 'media_prev',
  nextIcon: 'media_next',
  closeIcon: 'media_close',
  notificationIcon: 'notification'
 });

 this.musicControls.subscribe().subscribe(action => {

   function events(action) {
     const message = JSON.parse(action).message;
         switch(message) {
             case 'music-controls-next':
                 // Do something
                 break;
             case 'music-controls-previous':
                 // Do something
                 break;
             case 'music-controls-pause':
                 // Do something
                 break;
             case 'music-controls-play':
                 // Do something
                 break;
             case 'music-controls-destroy':
                 // Do something
                 break;

         // External controls (iOS only)
         case 'music-controls-toggle-play-pause' :
                 // Do something
                 break;
         case 'music-controls-seek-to':
           const seekToInSeconds = JSON.parse(action).position;
           this.musicControls.updateElapsed({
             elapsed: seekToInSeconds,
             isPlaying: true
           });
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
     }

 this.musicControls.listen(); // activates the observable above

 this.musicControls.updateIsPlaying(true);
			
			

			
			}
		
		 )};
			}
	
}
}