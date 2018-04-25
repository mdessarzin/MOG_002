import { Component, ViewChild } from '@angular/core';
import { IonicPage, IonicPageModule, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';


import { PlayerAudioPage } from '../player-audio/player-audio';
import { PlayerVideoPage } from '../player-video/player-video';

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



  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController) {
   
  }

  ngAfterViewInit() {
    // this.superTabsCtrl.increaseBadge('page1', 10);
    // this.superTabsCtrl.enableTabSwipe('page3', false);
    // this.superTabsCtrl.enableTabsSwipe(false);

    // Test issue #122
    // setTimeout(() => {
    //   this.superTabs.slideTo(4);
    // }, 2000);
  }

  	
	
  private dismiss() {
    this.viewCtrl.dismiss();
  }
	
  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerPage');
  }

}
