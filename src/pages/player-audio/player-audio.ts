import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  header: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
	  
	  if(navParams.get('header')==true){
		this.header = 'yes';
		}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerAudioPage');
  }

}
