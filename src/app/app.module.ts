import { Pro } from '@ionic/pro';
import { NgModule, ErrorHandler, Injectable, Injector  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AccueilPage } from '../pages/accueil/accueil';
import { ActualitePage } from '../pages/actualite/actualite';
import { ProgrammePage } from '../pages/programme/programme';
import { PodcastsPage } from '../pages/podcasts/podcasts';
import { ContactezNousPage } from '../pages/contactez-nous/contactez-nous';
import { BlogPage } from '../pages/blog/blog';
import { IonShrinkingHeader } from '../components/ion-shrinking-header';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

Pro.init('5a10a7ae', {
  appVersion: '0.0.0.1'
})

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;

  constructor(injector: Injector) {
    try {
      this.ionicErrorHandler = injector.get(IonicErrorHandler);
    } catch(e) {
      // Unable to get the IonicErrorHandler provider, ensure
      // IonicErrorHandler has been added to the providers list below
    }
  }

  handleError(err: any): void {
    Pro.monitoring.handleNewError(err);
    // Remove this if you want to disable Ionic's auto exception handling
    // in development mode.
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
  }
}

@NgModule({
  declarations: [
    MyApp,
    AccueilPage,
    ActualitePage,
    ProgrammePage,
    PodcastsPage,
    ContactezNousPage,
    BlogPage,
	IonShrinkingHeader,
	  
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AccueilPage,
    ActualitePage,
    ProgrammePage,
    PodcastsPage,
    ContactezNousPage,
    BlogPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
	   IonicErrorHandler,
    {provide: ErrorHandler, useClass: MyErrorHandler}
  ]
})
export class AppModule {}