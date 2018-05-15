import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform} from 'ionic-angular';

@Component({
  selector: 'page-contactez-nous',
  templateUrl: 'contactez-nous.html'
})
export class ContactezNousPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
	  alert(navParams.get('key'));
  }
  
}
