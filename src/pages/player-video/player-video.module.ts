import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayerVideoPage } from './player-video';

@NgModule({
  declarations: [
    PlayerVideoPage,
  ],
  imports: [
    IonicPageModule.forChild(PlayerVideoPage),
  ],
})
export class PlayerVideoPageModule {}
