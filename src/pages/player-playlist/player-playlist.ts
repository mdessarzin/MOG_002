import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PlayerPlaylistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-player-playlist',
  templateUrl: 'player-playlist.html',
})
export class PlayerPlaylistPage {

  header: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
	  
	  if(navParams.get('header')==true){
		this.header = 'yes';
		}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerPlaylistPage');
  }

}
