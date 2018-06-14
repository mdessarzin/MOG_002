import { Component, ViewChild, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Content, PopoverController, LoadingController, ModalController} from 'ionic-angular';
import { ScrollHideConfig } from '../../directives/scroll-hide/scroll-hide';
import * as $ from "jquery";
import { MusicControls } from '@ionic-native/music-controls';
import { Http } from '@angular/http';
import { Media, MediaObject } from '@ionic-native/media';
import { map } from 'rxjs/operators';
import { SocialSharing } from '@ionic-native/social-sharing';
import { DetailsPage } from '../details/details';
import { PlayerPage } from '../player/player';
import { AudioStreamProvider } from '../../providers/audio-stream/audio-stream';
import { PlayerpopupPage } from '../playerpopup/playerpopup';

@Component({
  selector: 'page-podcasts',
  templateUrl: 'podcasts.html'
})
export class PodcastsPage {
	private loadingPopup: any;
    artist: string;
    cover: string;
    track: string;
    date: string;
    cat: string;
    live: string;
	onplaying: string;
    animateClass: any;
    params: any = {};
    data: any = {};
    pushPage: any;
    buttonIcon: string = 'ios-play';
	footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  	headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
	link: string;
    title: string;
    image: string;
header: string;
	
   posts: Array<any> = [];
postsLoading: any;
pagination: number = 1;
  maximumPages = 10;

  constructor(
		public navCtrl: NavController,
		public http: Http, 
		public loadingCtrl: LoadingController,
		private socialSharing: SocialSharing,
		public navParams: NavParams,
		public plt: Platform,
		public modalCtrl: ModalController,
		public _player: AudioStreamProvider,
		public musicControls: MusicControls,
	){
			
			
		if(navParams.get('header')==true){
			this.header = 'yes';
		}
			
		this.title = navParams.get('title');
			

			this.loadData();

			
  }
	
	
	
update(refresher) {
    console.log('Begin async operation', refresher);
	
	this.loadData(false,refresher);		
  }
	
  loadData(infiniteScroll?,refresher?) {
	  
	  
			if (refresher) {
				this.pagination = 1;
			}

			this.http.get('https://www.radiolac.ch/wp-json/mog/v1/get_data?type=podcasts&taxonomy=chronique&per_page=15&term_id='+this.navParams.get('key')+'&page='+this.pagination).map(res => res.json()).subscribe(data => {
			  //  this.posts = data;
				console.log(this.posts);
				if (refresher) {
								  this.posts = [];
									refresher.complete();
								}

								for(let i of data){
									this.posts.push(i);

								}				  
							  this.postsLoading = '1';
								if (infiniteScroll) {
									infiniteScroll.complete();
								}
			});
	  

  }	
	
 loadMore(infiniteScroll) {
    this.pagination += 1;
    this.loadData(infiniteScroll);
 
    if (this.pagination === this.maximumPages) {
      infiniteScroll.enable(false);
    }
  }	
	

  private configPlayer(title,image, text, date, link) {

	 localStorage.setItem("player", "stop");
	 this._player.pauseProvider();
	 this._player.playerconfigProvider(link);
	// this._player.playProvider();
	// this.startAudio(title,image, text, date, link);
	
	  
		localStorage.setItem("podcast_title", title);
		localStorage.setItem("podcast_category", text);
		localStorage.setItem("podcast_cover", image);
		
		if(localStorage.player == 'play'){
			this._player.pauseProvider();
			localStorage.setItem("player", "stop");
        }
        else
        {
			localStorage.setItem("player", "play");
			console.log('Play Button clicked');
			this._player.playProvider();
		}
	  
	  
	  
	 
	$('ion-footer').animate({'margin-bottom': '0px' }, 200);
	$('.songArtist').html(text);
	$('.songTitle').html(title);
	$('.songCover').attr('src',image);								
  	this.openPlayer();
  }
  
		
	
	
	
ionViewDidLoad() {

		if(localStorage.player == 'play'){
           // this.buttonIcon = "ios-pause";
			$('.playerEtat_2').hide();
			$('.playerEtat_0').hide();
			$('.playerEtat_1').show();
        }
        else
        {
			$('.playerEtat_2').hide();
			$('.playerEtat_1').hide();
			$('.playerEtat_0').show();
        }
}

private whatsappShare(title, image, link){
    this.socialSharing.shareViaWhatsApp(title, image, link)
      .then(()=>{
//
    },
      ()=>{
         //
      })
  }



private share(message, title, image, link){
    this.socialSharing.share(title, image, image, link)
      .then(()=>{
       //
      },
      ()=>{
         //
      })
  }
	
	private startAudio(title,image, text, date, link){

		localStorage.setItem("podcast_title", title);
		localStorage.setItem("podcast_category", text);
		localStorage.setItem("podcast_cover", image);
		
		if(localStorage.player == 'play'){
			this._player.pauseProvider();
			localStorage.setItem("player", "stop");
        }
        else
        {
			localStorage.setItem("player", "play");
			console.log('Play Button clicked');
			this._player.playProvider();
		}
}
	
	private openPlayer(){
       let modal = this.modalCtrl.create(PlayerPage);
    	modal.present();   
    }
	
	
	private openPlayerVideo(url,poster){
        //console.log(this.login);
       let modal = this.modalCtrl.create(PlayerpopupPage,{url:url, poster:poster});
    	modal.present();   
    }
	
	
	
}
