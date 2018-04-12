import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { ScrollHideConfig } from '../../directives/scroll-hide/scroll-hide';

@Component({
  selector: 'page-blog',
  templateUrl: 'blog.html'
})
export class BlogPage {
	 	posts: any;
  	fakeUsers: Array<any> = new Array(7);
	footerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-bottom', maxValue: undefined };
  	headerScrollConfig: ScrollHideConfig = { cssProperty: 'margin-top', maxValue: 44 };

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
