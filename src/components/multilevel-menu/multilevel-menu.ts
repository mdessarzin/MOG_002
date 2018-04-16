import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations'; // https://forum.ionicframework.com/t/guide-how-to-update-to-ionic-3-x/87516/3
import { MenuController } from 'ionic-angular';

/*
  Generated class for the MultilevelMenu component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'multilevel-menu',
  templateUrl: 'multilevel-menu.html',
  // styleUrls: ['multilevel-menu.css'],
  animations: [
    trigger('expand', [
      state('void', style({
        height: '0px'
      })),
      transition('* => *', animate('150ms ease-in-out'))
    ])
  ]
})
export class MultilevelMenuComponent {

  @Input('categories') categories;
  @Input('selectedCategory') selectedCategory;
  @Output() onSelect = new EventEmitter();

  activeCat: any;
  activeSubCat: any;

  constructor(public MenuCtrl: MenuController) {
    this.activeCat = null;
    this.activeSubCat = null;
  }

  isActive(cat) {
    if (this.selectedCategory) {
      return cat.id == this.selectedCategory.id;
    }

    return false;
  }

  toggleCat(cat) {
    if (this.isCatShown(cat)) {
      this.activeCat = null;
    } else {
      this.activeCat = cat;
    }

    this.activeSubCat = null;// Also hide all subCats

    if (cat.items.length == 0) {
      this.triggerOnSelect(cat);
    }
  }

  isCatShown(cat) {
    return this.activeCat === cat;
  }

  toggleSubCat(cat) {
    if (this.isSubCatShown(cat)) {
      this.activeSubCat = null;
    } else {
      this.activeSubCat = cat;
    }

    if (cat.items.length == 0) {
      this.triggerOnSelect(cat);
    }
  }

  isSubCatShown(cat) {
    return this.activeSubCat === cat;
  }

  triggerOnSelect(cat) {
    this.onSelect.emit(cat);
    this.MenuCtrl.close();
  }

}
