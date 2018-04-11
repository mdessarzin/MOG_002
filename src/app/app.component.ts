import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ActualitePage } from '../pages/actualite/actualite';
import { ProgrammePage } from '../pages/programme/programme';
import { PodcastsPage } from '../pages/podcasts/podcasts';
import { ContactezNousPage } from '../pages/contactez-nous/contactez-nous';
import { BlogPage } from '../pages/blog/blog';


import { AccueilPage } from '../pages/accueil/accueil';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
    rootPage:any = AccueilPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  goToAccueil(params){
    if (!params) params = {};
    this.navCtrl.setRoot(AccueilPage);
  }goToActualite(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ActualitePage);
  }goToProgramme(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ProgrammePage);
  }goToPodcasts(params){
    if (!params) params = {};
    this.navCtrl.setRoot(PodcastsPage);
  }goToContactezNous(params){
    if (!params) params = {};
    this.navCtrl.setRoot(ContactezNousPage);
  }goToBlog(params){
    if (!params) params = {};
    this.navCtrl.setRoot(BlogPage);
  }
}
