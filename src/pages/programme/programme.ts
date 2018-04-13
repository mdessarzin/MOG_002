import { Component } from '@angular/core';
import {NavController, NavParams, IonicPage, LoadingController} from 'ionic-angular';

@Component({
  selector: 'page-programme',
  templateUrl: 'programme.html'
})
export class ProgrammePage {
  rootNavCtrl: NavController;

  constructor(public navCtrl: NavController) {
  }
  
}
