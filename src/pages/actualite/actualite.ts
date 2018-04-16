import { Component, ViewChild } from '@angular/core';
import { IonicPage, IonicPageModule, NavController, NavParams } from 'ionic-angular';

import { SuperTabsController } from '../../ionic2-super-tabs/src';
import {SuperTabs} from "../../ionic2-super-tabs/src/components/super-tabs";

import { BlogPage } from '../../pages/blog/blog';

@Component({
  selector: 'page-actualite',
  templateUrl: 'actualite.html'
})
export class ActualitePage {
	  page1: any = BlogPage;
	
	  @ViewChild(SuperTabs) superTabs: SuperTabs;

   showIcons: boolean = false;
  showTitles: boolean = true;
  pageTitle: string = 'Full Height';
	
  selectedTab = 0;
 
	
	
  constructor(public navCtrl: NavController, private navParams: NavParams, private superTabsCtrl: SuperTabsController) {
    const type = navParams.get('type');
    switch (type) {
      case 'icons-only':
        this.showTitles = false;
        this.pageTitle += ' - Icons only';
        break;

      case 'titles-only':
        this.showIcons = false;
        this.pageTitle += ' - Titles only';
        break;
    }
  }

  ngAfterViewInit() {
    // this.superTabsCtrl.increaseBadge('page1', 10);
    // this.superTabsCtrl.enableTabSwipe('page3', false);
    // this.superTabsCtrl.enableTabsSwipe(false);

    // Test issue #122
    // setTimeout(() => {
    //   this.superTabs.slideTo(4);
    // }, 2000);
  }

  onTabSelect(tab: { index: number; id: string; }) {
    console.log(`Selected tab: `, tab);
  }

}
