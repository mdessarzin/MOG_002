import { Component, ViewChild, Injectable } from '@angular/core';
import { NavController, Platform, Content, PopoverController, LoadingController } from 'ionic-angular';
import { ScrollHideConfig } from '../../directives/scroll-hide/scroll-hide';
import * as $ from "jquery";
import { MusicControls } from '@ionic-native/music-controls';
import { AudioStreamProvider } from '../../providers/audio-stream/audio-stream';

import {Http, Response} from "@angular/http";
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

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
		private _musicControls: MusicControls,
		public _player: AudioStreamProvider,
		public http: Http, 
		public loadingCtrl: LoadingController,
		//private iab: InAppBrowser,
		private _PLATFORM : Platform
		//private ga: GoogleAnalytics
	) {
			
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
    ionViewDidLoad() {
		this.loading();
  }

	
	
	
}
