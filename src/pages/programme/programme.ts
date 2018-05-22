import { Component } from '@angular/core';
import {NavController, NavParams, IonicPage, LoadingController, ModalController} from 'ionic-angular';

@Component({
  selector: 'page-programme',
  templateUrl: 'programme.html'
})
export class ProgrammePage {
  rootNavCtrl: NavController;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
	  

	  
  }
  
	
	ionViewDidLoad() {

	
		if(localStorage.player == 'play'){
           // this.buttonIcon = "ios-pause";
			$('.playerEtat_2').hide();
			$('.playerEtat_0').hide();
			$('.playerEtat_1').show();

        }
        else
        {
            //this.buttonIcon = "ios-play";
			$('.playerEtat_2').hide();
			$('.playerEtat_1').hide();
			$('.playerEtat_0').show();
        }
}
	private openPlayer(){
        //console.log(this.login);
       let modal = this.modalCtrl.create(PlayerPage);
    modal.present();
    
    
    }
	
}
