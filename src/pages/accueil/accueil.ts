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
		  private _musicControls: MusicControls,
		//private iab: InAppBrowser,
		private _PLATFORM : Platform
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
			
			this._musicControls.destroy(); // it's the same with or without the destroy 
			this._musicControls.create({
			track       : 'test',        // optional, default : ''
			artist      : 'test',                       // optional, default : ''
			cover       : '',      // optional, default : nothing
			isPlaying   : true,                         // optional, default : true
			dismissable : true,                         // optional, default : false
			hasPrev   : false,      // show previous button, optional, default: true
			hasNext   : false,      // show next button, optional, default: true
			hasClose  : false,       // show close button, optional, default: false
			hasSkipForward : false,  // show skip forward button, optional, default: false
			hasSkipBackward : false, // show skip backward button, optional, default: false
			skipForwardInterval: 0, // display number for skip forward, optional, default: 0
			skipBackwardInterval: 0, // display number for skip backward, optional, default: 0
			album       : 'Radio Cristy Player',     // optional, default: ''
			duration : 0, // optional, default: 0
			elapsed : 0, // optional, default: 0
			ticker    : 'En ce moment'
			});
			 this._musicControls.subscribe().subscribe((action) => {
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
			   this._musicControls.listen(); 
			   this._musicControls.updateIsPlaying(false);
			   break;
			case 'music-controls-play':
			   // Do something
			   console.log('music play');

			   this._player.playProvider();
			   this._musicControls.listen(); 
			   this._musicControls.updateIsPlaying(true);
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
			this._musicControls.listen(); // activates the observable above
			this._musicControls.updateIsPlaying(true);	

			localStorage.setItem("player", "play");
			this.buttonIcon = "ios-pause";

			console.log('Play Button clicked');
			this._player.playProvider();

			}
	
	}
	
}
