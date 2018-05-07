import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PlayerpopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-playerpopup',
  templateUrl: 'playerpopup.html',
})
export class PlayerpopupPage {
  url: string;
  img: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
	  	this.url = navParams.get('url');
	  	this.img = navParams.get('img');

  }

  ionViewDidLoad() {
	 
    console.log('ionViewDidLoad PlayerpopupPage');
  }

}