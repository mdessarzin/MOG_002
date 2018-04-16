import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AccueilPage } from '../pages/accueil/accueil';
import { MenuService } from '../components/multilevel-menu/menu';
import { ContactezNousPage } from '../pages/contactez-nous/contactez-nous';


@Component({
  templateUrl: 'app.html',
  providers: [MenuService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = AccueilPage;

  categories: any;
  selectedCategory: any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public MenuService: MenuService) {
    this.initializeApp();

    this.categories = MenuService.getAll();
    this.selectedCategory = null;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  onMenuSelect(cat) {
    console.info('In app.components: selected category', cat);
	 console.info(cat.url);
    this.selectedCategory = cat;
	  
    this.nav.setRoot(cat.url, {
      selectedCategory: cat
    })
  }
}
