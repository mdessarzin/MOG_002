import { StreamingMedia, StreamingVideoOptions, StreamingAudioOptions } from '@ionic-native/streaming-media';
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
		 		private streamingMedia: StreamingMedia,
		 		public _player: AudioStreamProvider,
		 		public musicControls: MusicControls,


		//private ga: GoogleAnalytics
	){
			
			
		if(navParams.get('header')==true){
			this.header = 'yes';
		}
			
		this.title = navParams.get('title');
			

			this.loadData();

			
  }
	
	
	
  loadData(infiniteScroll?) {

	 
	  setTimeout(() => {
			  fetch('https://www.radiolac.ch/wp-json/wp/v2/podcasts?_embed&per_page=15&chronique='+this.navParams.get('key')+'&page='+this.pagination)
				.then(response => response.json())
				.then(data => {
				  console.log(data);
				  //this.posts = data;
				  	for(let i of data){
						this.posts.push(i);
					}
				  this.postsLoading = '1';
				  	if (infiniteScroll) {
						infiniteScroll.complete();
					}
				});
			},20);
	  
	  
	  
	
	  /*

					*/
  }	
	
 loadMore(infiniteScroll) {
    this.pagination += 1;
    this.loadData(infiniteScroll);
 
    if (this.pagination === this.maximumPages) {
      infiniteScroll.enable(false);
    }
  }	
	
  private startVideo(urlvideo) {
				//alert(urlvideo);
		 		this._player.pauseProvider();
			    //this.musicControls.listen();
				//this.musicControls.updateIsPlaying(false);
				//this.onplaying = '0';
                localStorage.setItem("player", "stop");
                $('.btPlayer').html('<i class="fas fa-play-circle fa-3x"></i>');
		
				let options: StreamingVideoOptions = {

				  successCallback: () => {  },
				  errorCallback: (e) => { console.log('Error: ', e) }
				 // orientation: 'landscape'
				}; 
				// http://www.sample-videos.com/
				this.streamingMedia.playVideo(urlvideo, options);
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
            //this.buttonIcon = "ios-play";
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
	
	private showDetails(title,image, text, date, link){
        //console.log(this.login);
       
    
    this.navCtrl.push(DetailsPage,{
            title: title,
            text: text,
            image: image,
            date: date,
            link: link,
            cat: 'Actualité'
        });
    }
	
	private openPlayer(){
        //console.log(this.login);
       let modal = this.modalCtrl.create(PlayerPage);
    modal.present();
    
    
    }
	
	
	
}
