import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';

@Component({
  selector: 'page-accueil',
  templateUrl: 'accueil.html'
})
export class AccueilPage {
 	posts: any;
  	fakeUsers: Array<any> = new Array(7);
	  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController) {
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
