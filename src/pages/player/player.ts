import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';

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

  constructor(public viewCtrl: ViewController) {
  }

  private dismiss() {
    this.viewCtrl.dismiss();
  }
	
  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerPage');
  }

}
