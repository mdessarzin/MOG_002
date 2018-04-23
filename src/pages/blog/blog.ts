import { Component, ViewChild, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Content, PopoverController, LoadingController } from 'ionic-angular';
import { ScrollHideConfig } from '../../directives/scroll-hide/scroll-hide';
import * as $ from "jquery";
import { AudioStreamProvider } from '../../providers/audio-stream/audio-stream';
import { MusicControls } from '@ionic-native/music-controls';
import { Http } from '@angular/http';
import { Media, MediaObject } from '@ionic-native/media';
import { map } from 'rxjs/operators';
import { SocialSharing } from '@ionic-native/social-sharing';
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-blog',
  templateUrl: 'blog.html'
})
export class BlogPage {
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
 	posts: any;
  	fakeUsers: Array<any> = new Array(3);
	footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  	headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };
	link: string;
    title: string;
    image: string;
header: string;
	
  constructor(
		public navCtrl: NavController,
		public http: Http, 
		public loadingCtrl: LoadingController,
		 private socialSharing: SocialSharing,
		 public navParams: NavParams,
		 public plt: Platform,
		//private ga: GoogleAnalytics
	){
			
			
 	if(navParams.get('header')==true){
		this.header = 'yes';
	}
			
		this.title = navParams.get('title');
			

			
		setTimeout(() => {
			  fetch('https://www.radiolac.ch/wp-json/wp/v2/posts?_embed&categories='+this.navParams.get('key'))
				.then(response => response.json())
				.then(data => {
				  console.log(data);
				  this.posts = data;
				});
			},100);

			
  }
ionViewDidLoad() {

		if(localStorage.player == 'play'){
			this.onplaying = '1';
        }
        else
        {
			this.onplaying = '0';
			
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
	
}
	