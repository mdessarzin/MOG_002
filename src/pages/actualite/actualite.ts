import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-actualite',
  templateUrl: 'actualite.html'
})
export class ActualitePage {

  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {
  }
  
}
