import { Component, ViewChild } from '@angular/core';
import { IonicPage, IonicPageModule, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { StreamingMedia, StreamingVideoOptions, StreamingAudioOptions } from '@ionic-native/streaming-media';

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


  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController,private streamingMedia: StreamingMedia) {
   this.typeplayer = 'audio';
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

  	startVideo() {
		
    let options: StreamingVideoOptions = {
      successCallback: () => { this.typeplayer = 'audio'; },
      errorCallback: (e) => { console.log('Error: ', e) },
      orientation: 'landscape'
    }; 
    // http://www.sample-videos.com/
    this.streamingMedia.playVideo('https://livevideo.infomaniak.com/streaming/livecast/lfmmd/playlist.m3u8', options);
  }
	
  private dismiss() {
    this.viewCtrl.dismiss();
  }
	
  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerPage');
  }

}
