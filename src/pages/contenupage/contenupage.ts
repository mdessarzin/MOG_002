import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform,LoadingController} from 'ionic-angular';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { SocialSharing } from '@ionic-native/social-sharing';
import * as $ from "jquery";
import { Http } from '@angular/http';

/**
 * Generated class for the ContenupagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contenupage',
  templateUrl: 'contenupage.html',
})
export class ContenupagePage {
link: string;
    title: string;
    text: any;
    date: string;
   image:any;
    cat: string;
	trustedPostUrl: SafeResourceUrl;
	postsLoading: any;
	setHeight: any;
	posts: Array<any> = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, private sanitizer: DomSanitizer, private socialSharing: SocialSharing,public loadingCtrl: LoadingController
) {
	  
	   this.title = navParams.get('title');

	  
	  setTimeout(() => {
			  fetch('https://www.radiolac.ch/wp-json/mog/v1/get_data?clean=true&page_id='+navParams.get('key'))
				.then(response => response.json())
				.then(data => {
				  console.log(data);
				  for(let i of data){
						//this.posts(i);
					  this.text = sanitizer.bypassSecurityTrustHtml(i.content);
					  
					}


				});
			},20);
	  
	  
	  
	  
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