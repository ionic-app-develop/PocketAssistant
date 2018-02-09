import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Items } from '../../providers/providers';

@IonicPage({name: 'notification-detail'})
@Component({
  selector: 'page-notification-detail',
  templateUrl: 'notification-detail.html'
})
export class NotificationDetailPage {
  item: any;

  constructor(public navCtrl: NavController, navParams: NavParams, items: Items) {
    this.item = navParams.get('item') || items.defaultItem;
  }

}
