import { Component, ViewChild, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Content, PopoverController, LoadingController, ViewController, ModalController } from 'ionic-angular';
import * as $ from "jquery";
import { AudioStreamProvider } from '../../providers/audio-stream/audio-stream';
import { MusicControls } from '@ionic-native/music-controls';
import { Http } from '@angular/http';
import { Media, MediaObject } from '@ionic-native/media';
import { map } from 'rxjs/operators';
import { PlayerpopupPage } from '../playerpopup/playerpopup';

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
	titre: string;
	soustitre: string;
	detail: string;
  duration_string: string;
  public positions: any = 0;
	durations: any = -1;
	public timingseek: any;
	
  constructor(
		public navCtrl: NavController,
	 	private navParams: NavParams,
		public viewCtrl: ViewController,
		public _player: AudioStreamProvider,
		public http: Http, 
		public loadingCtrl: LoadingController,
		public plt: Platform,
		public modalCtrl: ModalController
	){
   		
			
	 this.typeplayer = 'audio';
			
			
  }
	

  ngAfterViewInit() {	  
	  
	  if(localStorage.type_player == 'live'){
			this.titreplayer = 'Direct';
        }
        else
        {
			
			
			this._player.stream.getCurrentPosition().then((curpos) => {
				console.log(curpos);
				this.positions = curpos;
			});					
			
			this.timingseek = setInterval(() => {      
				this._player.stream.getCurrentPosition().then((curpos) => {
					console.log(curpos);
					this.positions = curpos;
				});					
			}, 1000);

			this.titreplayer = 'Podcast';
			this.soustitre = localStorage.podcast_title;
			this.titre = '';
			this.detail = localStorage.podcast_category;

			//$('.songArtist').html(localStorage.podcast_title);
			//$('.songTitle').html(localStorage.podcast_category);
			$('.songCover').attr('src',localStorage.podcast_cover);
			$('#coverPlayer').attr('src',localStorage.podcast_cover);
        }

	  	  	let self = this;
	  		this.durations = this._player.stream.getDuration();  

	    
	  
  }

	startVideo() {
		this._player.pauseProvider();
		this.onplaying = '0';
		localStorage.setItem("player", "stop");
		$('.btPlayer').html('<i class="fas fa-play-circle fa-3x"></i>');
		let modal = this.modalCtrl.create(PlayerpopupPage,{url:'https://livevideo.infomaniak.com/streaming/livecast/lfmmd/playlist.m3u8', poster:''});
		modal.present();   
	}
	
	private dismiss() {
		this.viewCtrl.dismiss();
	}
	
	slideStart() {
		if (this.timingseek) {
			clearInterval(this.timingseek);
		}
		this._player.pauseProvider();
		console.log('pause');
	}

	slideEnd() {
		var number = Number.parseInt(this.positions) * 1000;
		this._player.stream.seekTo(number);
		this._player.playProvider();
		console.log("End: value: "+this.positions);
		this.timingseek = setInterval(() => {      
			this._player.stream.getCurrentPosition().then((curpos) => {
				console.log(curpos);
				this.positions = curpos;
			});					
		}, 1000);
	}

	seekTo(type) {
		
		this._player.stream.getCurrentPosition().then((position) => {
			var number = Number.parseInt(position) * 1000;
			switch(type){
				case 'back':
					this._player.stream.seekTo(number - 15000);
					break;
				case 'forward':
					this._player.stream.seekTo(number + 15000);
					break;
			}
		});
					this._player.stream.getCurrentPosition().then((curpos) => {
				console.log(curpos);
				this.positions = curpos;
			});	
	}
	
	startAudio() {      
        if(localStorage.player == 'play'){
				this._player.pauseProvider();
				if (this.timingseek) {
					clearInterval(this.timingseek);
				}

			   // this.musicControls.listen();
				//this.musicControls.updateIsPlaying(false);
				this.onplaying = '0';
                localStorage.setItem("player", "stop");
                $('.btPlayer').html('<i class="fas fa-play-circle fa-3x"></i>');
        }
        else
        {
			
			if(localStorage.type_player == 'replay'){

					this.timingseek = setInterval(() => {      
						this._player.stream.getCurrentPosition().then((curpos) => {
							console.log(curpos);
							this.positions = curpos;
						});					
					}, 1000);
					this.durations = this._player.stream.getDuration();  
		}
			
		$('.btPlayer').html('<i class="fas fa-pause-circle fa-3x"></i>');
		//$('.btPlayer').html('<ion-spinner name="crescent"></ion-spinner>');

		this.onplaying = '1';
		console.log('Play Button clicked');
		if(localStorage.type_player == 'live'){
			this._player.playerconfigProvider();
		}
		else {
			//this.durations = this._player.stream.getDuration();  
		}
		this._player.playProvider();

		}
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

		goLive() { 
			this._player.pauseProvider();
			this._player.playerconfigProvider();
			localStorage.setItem("type_player", "live");
			this.titreplayer = 'Direct';
			this._player.playProvider();
		}

}
