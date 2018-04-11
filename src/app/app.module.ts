import { NgModule, ErrorHandler } from '@angular/core';
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

@NgModule({
  declarations: [
    MyApp,
    AccueilPage,
    ActualitePage,
    ProgrammePage,
    PodcastsPage,
    ContactezNousPage,
    BlogPage,
	IonShrinkingHeader
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}