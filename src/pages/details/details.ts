import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform,LoadingController} from 'ionic-angular';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { SocialSharing } from '@ionic-native/social-sharing';
import * as $ from "jquery";
import { IframeAutoHeightDirective } from '../../directives/iframeautoheight/iframeautoheight';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
link: string;
    title: string;
    text: any;
    date: string;
   image:any;
    cat: string;
	trustedPostUrl: SafeResourceUrl;
	postsLoading: any;
	setHeight: any;

	private optionsBrowser: ThemeableBrowserOptions = {
							 statusbar: {
								 color: '#ffffffff'
							 },
							 toolbar: {
								 height: 44,
								 color: '#f0f0f0ff'
							 },
							 title: {
								 color: '#003264ff',
								 showPageTitle: true
							 },
							 backButton: {
								 image: 'back',
								 imagePressed: 'back_pressed',
								 align: 'left',
								 event: 'backPressed'
							 },
							 forwardButton: {
								 image: 'forward',
								 imagePressed: 'forward_pressed',
								 align: 'left',
								 event: 'forwardPressed'
							 },
							 closeButton: {
								 image: 'close',
								 imagePressed: 'close_pressed',
								 align: 'left',
								 event: 'closePressed'
							 },
							 customButtons: [
								 {
									 image: 'share',
									 imagePressed: 'share_pressed',
									 align: 'right',
									 event: 'sharePressed'
								 }
							 ],
							 menu: {
								 image: 'menu',
								 imagePressed: 'menu_pressed',
								 title: 'Test',
								 cancel: 'Cancel',
								 align: 'right',
								 items: [
									 {
										 event: 'helloPressed',
										 label: 'Hello World!'
									 },
									 {
										 event: 'testPressed',
										 label: 'Test!'
									 }
								 ]
							 },
							 backButtonCanClose: true
						};
	
	
  constructor(public navCtrl: NavController, public navParams: NavParams, private sanitizer: DomSanitizer, private socialSharing: SocialSharing,public loadingCtrl: LoadingController,private themeableBrowser: ThemeableBrowser
) {
	  this.link = navParams.get('link');
	  this.title = navParams.get('title');
	  
	  	const browser: ThemeableBrowserObject = this.themeableBrowser.create(this.link+'?clean=true', '_blank', this.optionsBrowser);


	  
	 
  }
	
	  	

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
	//this.trustedPostUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.link+'?clean=true');


  }
	
	private loadclose(){
		this.postsLoading = '1';

	
	}
	
	private share(){
    this.socialSharing.share(this.navParams.get('text'), this.navParams.get('title'), null, this.navParams.get('link'))
      .then(()=>{
       //
      },
      ()=>{
         //
      })
  }
	
}
