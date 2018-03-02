import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {Items, NotificationService} from '../../providers/providers';
import {Notification} from "../../models";

@IonicPage({name: 'notification-detail'})
@Component({
  selector: 'page-notification-detail',
  templateUrl: 'notification-detail.html'
})
export class NotificationDetailPage {
  item: any;
  notification: any;

  constructor(private navCtrl: NavController, private navParams: NavParams, private notificationService: NotificationService) {
    this.item = navParams.get('item');
    this.updateNotification(this.item.notificationId);
  }

  updateNotification(notificationId) {
    this.notificationService.queryOne({notificationId: notificationId}).subscribe((res) => {
      this.notification = res;
      this.notification.readed = true;
      this.notificationService.update(this.notification).subscribe((res) => {
        console.log("res: " + JSON.stringify(res));
      });
    });
  }

}
