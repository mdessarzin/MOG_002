import { Pro } from '@ionic/pro';
import { NgModule, ErrorHandler, Injectable, Injector, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
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
import { ScrollHideDirective } from '../directives/scroll-hide/scroll-hide';
import { AudioStreamProvider } from '../providers/audio-stream/audio-stream';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { MusicControls } from '@ionic-native/music-controls';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';
import { OneSignal } from '@ionic-native/onesignal';
import {Observable} from 'rxjs/Rx';

localStorage.setItem("player", "stop");
localStorage.setItem("firstclickonplayer", "oui");

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
	  ScrollHideDirective
	  
  ],
  imports: [
	  
	  HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp, {
        preloadModules: true
    })
  ],
schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
	  AudioStreamProvider,
	  MusicControls,
    {provide: ErrorHandler, useClass: MyErrorHandler}
  ]
})
export class AppModule {}