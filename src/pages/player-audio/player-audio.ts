import { Component, ViewChild, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Content, PopoverController, LoadingController, ModalController } from 'ionic-angular';
import { AudioStreamProvider } from '../../providers/audio-stream/audio-stream';
import { MusicControls } from '@ionic-native/music-controls';
import { Http } from '@angular/http';

/**
 * Generated class for the PlayerAudioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-player-audio',
  templateUrl: 'player-audio.html',
})
export class PlayerAudioPage {
	
  	
  	
	constructor(public navCtrl: NavController, public navParams: NavParams,public _player: AudioStreamProvider,
		public http: Http, public plt: Platform) {
	  
	  if(navParams.get('header')==true){
		this.header = 'yes';
		}
  }

  ionViewDidLoad() {
	  
	  
}
}