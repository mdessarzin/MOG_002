import { NgModule } from '@angular/core';
import { SuperTabsModule } from '../ionic2-super-tabs/src';
import { IonicImageLoader } from 'ionic-image-loader';

// import { SuperTabsModule } from 'ionic2-super-tabs';

@NgModule({
  exports: [
    SuperTabsModule
  ],
imports: [
    IonicImageLoader
  ]
})
export class SharedModule {}
