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


  constructor(public navCtrl: NavController, public navParams: NavParams, private sanitizer: DomSanitizer, private socialSharing: SocialSharing,public loadingCtrl: LoadingController,private themeableBrowser: ThemeableBrowser
) {
	  this.link = navParams.get('link');
	  this.title = navParams.get('title');
	  this.openBrowser();
	 
  }
	
  openBrowser() {
    // https://ionicframework.com/docs/native/themeable-browser/
    const options: ThemeableBrowserOptions = {
      toolbar: {
        height: 44,
        color: '#3573bbff'
      },
      title: {
        color: '#ffffffff',
        showPageTitle: true,
        staticText: 'Academy Browser'
      },
      backButton: {
        wwwImage: 'assets/img/back.png',
        align: 'left',
        event: 'backPressed'
      },
      forwardButton: {
        wwwImage: 'assets/img/forward.png',
        align: 'left',
        event: 'forwardPressed'
      },
      closeButton: {
        wwwImage: 'assets/img/close.png',
        align: 'left',
        event: 'closePressed'
      },
    };
 
    const browser: ThemeableBrowserObject = this.themeableBrowser.create('https://ionicacademy.com', '_blank', options);
 
    browser.on('closePressed').subscribe(data => {
      browser.close();
    })
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
