import { Component, ViewChild, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Content, PopoverController, LoadingController, ModalController, ViewController} from 'ionic-angular';
import { ScrollHideConfig } from '../../directives/scroll-hide/scroll-hide';
import * as $ from "jquery";
import { AudioStreamProvider } from '../../providers/audio-stream/audio-stream';
import { Http } from '@angular/http';
import { Media, MediaObject } from '@ionic-native/media';
import { map } from 'rxjs/operators';
import { SocialSharing } from '@ionic-native/social-sharing';
import { DetailsPage } from '../details/details';
import { PlayerPage } from '../player/player';
import { PlayerPlaylistPage } from '../player-playlist/player-playlist'
import { CordovaAudioPlayerService } from '../../providers/streaming/streaming';


//import {Http, Response} from "@angular/http";
//import {Observable} from 'rxjs/Rx';
//import 'rxjs/add/operator/catch';
//import 'rxjs/Rx';

@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html'
})

export class AccueilPage {
	private loadingPopup: any;
    artist: string;
    cover: string;
    track: string;
    date: string;
    cat: string;
	onplaying: string;
    animateClass: any;
    params: any = {};
    data: any = {};
    pushPage: any;
    buttonIcon: string = 'ios-play';
  	fakeUsers: Array<any> = new Array(3);
	footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  	headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
	link: string;
    title: string;
    image: string;
	postsLoading: any;
	pagination: number = 1;
	maximumPages = 10;
	posts: Array<any> = [];

  constructor(
		public navCtrl: NavController,
		public _player: AudioStreamProvider,
		public http: Http, 
		public loadingCtrl: LoadingController,
		 private socialSharing: SocialSharing,
		 public modalCtrl: ModalController,
		 public viewCtrl: ViewController,
		 public plt: Platform,
		 private cdvAudioPlayer: CordovaAudioPlayerService,	
		//private ga: GoogleAnalytics
	){
		this.loadData();		
			
			
	
	
  }

	
update(refresher) {
    console.log('Begin async operation', refresher);
		  setTimeout(() => {

	this.loadData(false,refresher);	
			  },200);
  }
	
  loadData(infiniteScroll?,refresher?) {

	  if (refresher) {
    	this.pagination = 1;
	  }

	  setTimeout(() => {
			  fetch('https://www.radiolac.ch/wp-json/mog/v1/get_data?type=post&taxonomy=category&per_page=10&page='+this.pagination)
				.then(response => response.json())
				.then(data => {
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
			},20);
  }	
	
 loadMore(infiniteScroll) {
    this.pagination += 1;
    this.loadData(infiniteScroll);
 
    if (this.pagination === this.maximumPages) {
      infiniteScroll.enable(false);
    }
  }	
	

ionViewDidLoad() {

	  if(localStorage.type_player == 'live'){
        }
        else
        {
			$('.songArtist').html(localStorage.podcast_title);
			$('.songTitle').html(localStorage.podcast_category);
			$('.songCover').attr('src',localStorage.podcast_cover);
        }
	
		if(localStorage.player == 'play'){
			$('.btPlayer').html('<i class="fas fa-pause-circle fa-3x"></i>');
			$('.playerEtat_2').hide();
			$('.playerEtat_0').hide();
			$('.playerEtat_1').show();
        }
        else
        {
			$('.btPlayer').html('<i class="fas fa-play-circle fa-3x"></i>');
			$('.playerEtat_2').hide();
			$('.playerEtat_1').hide();
			$('.playerEtat_0').show();
        }
      
		$.ajaxSetup({ cache: false });
		$.getJSON('https://www.mediaone-digital.ch/cache/radiolac.json', function(data){
			
				   	if(localStorage.type_player == 'live'){
						$('.songArtist').html(data.live[0].interpret);
						$('.songTitle').html(data.live[0].title);
						$('.songCover').attr('src',data.live[0].imageURL);
					}
					else
					{
						//
					}

		});

	}
	
	
	
	


	
startAudio() {      
  // if (this.plt.is('cordova')) {
     
	
		 this.cdvAudioPlayer.setOptions({ verbose: true, resetStreamOnPause: true })	
     .then(() => {	
       this.cdvAudioPlayer.setPlaylistItems([	
         { trackId: '12345', assetUrl: 'http://vod.infomaniak.com/redirect/mediaonecontactsa_2_vod/folder-40843/mp3-476/les-informations_18-05-22-17-00-00_aodradiolac.mp3', albumArt: 'https://marketplace.canva.com/MAB6qiO-UQ8/1/0/thumbnail_large/canva-abstract-music-album-cover-MAB6qiO-UQ8.jpg', artist: 'Awesome', album: 'Test Files', title: 'Test 1' },	
         { trackId: '678900', assetUrl: 'http://vod.infomaniak.com/redirect/mediaonecontactsa_2_vod/folder-40730/mp3-476/allo-radio-lac_18-05-22-16-24-00_aodradiolac.mp3', albumArt: 'https://marketplace.canva.com/MAB6qiO-UQ8/1/0/thumbnail_large/canva-abstract-music-album-cover-MAB6qiO-UQ8.jpg', artist: 'Awesome', album: 'Test Files', title: 'Test 2' },	
         { trackId: 'a1b2c3d4', assetUrl: 'http://vod.infomaniak.com/redirect/mediaonecontactsa_2_vod/folder-40843/mp3-476/les-informations_18-05-22-17-00-00_aodradiolac.mp3', albumArt: 'https://marketplace.canva.com/MAB6qiO-UQ8/1/0/thumbnail_large/canva-abstract-music-album-cover-MAB6qiO-UQ8.jpg', artist: 'Awesome', album: 'Test Files', title: 'Test 3' },	
         { trackId: 'a1bSTREAM', assetUrl: 'http://vod.infomaniak.com/redirect/mediaonecontactsa_2_vod/folder-40730/mp3-476/allo-radio-lac_18-05-22-16-36-00_aodradiolac.mp3', albumArt: 'https://marketplace.canva.com/MAB6qiO-UQ8/1/0/thumbnail_large/canva-abstract-music-album-cover-MAB6qiO-UQ8.jpg', artist: 'Awesome', album: 'Streams', title: 'The Stream', isStream: true },	
       ])	
       .then(() => {	
         this.cdvAudioPlayer.play();	
       }).catch((err) => console.log('YourService, cdvAudioPlayer setPlaylistItems error: ', err));	
     }).catch((err) => console.log('YourService, cdvAudioPlayer init error: ', err));	

	
	
        if(localStorage.player == 'play'){
              //  this._player.pauseProvider();
			  //  this.musicControls.listen();
				//this.musicControls.updateIsPlaying(false);
				//this.onplaying = '0';
                
                //$('.btPlayer').html('<i class="fas fa-play-circle fa-3x"></i>');
        }
        else
        {
			
			//this._player.playerconfigProvider();
			//this._player.playProvider();
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
	
private showDetails(id,title){
        //console.log(this.login);
       
    
    this.navCtrl.push(DetailsPage,{
            title: title,
            key: id
           
        });
}
	

private openPlayer(){
        //console.log(this.login);
       let modal = this.modalCtrl.create(PlayerPage); //PlayerPage
    modal.present();
    
    
    }
	
}
	