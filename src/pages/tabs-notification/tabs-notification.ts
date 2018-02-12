import {TranslateService} from '@ngx-translate/core';
import {Storage} from '@ionic/storage';
import {Component} from '@angular/core';
import {NavController, AlertController, IonicPage} from 'ionic-angular';
import {AppTranslationService} from "../../app/app.translation.service";
import {Item, Notification} from '../../models/index';
import {Authentication, Items, ItemService, NotificationService} from '../../providers/providers';
import {Utils} from "../../common/utils";
import {PublicVar} from "../../common/constant";

@IonicPage({name: 'notification'})
@Component({
  selector: 'page-tabs-notification',
  templateUrl: 'tabs-notification.html'
})
export class TabsNotification {
  // currentItems: Item[];
  private timer;
  currentItems: any = [];
  notifications: any = [];

  langKeys = [];
  langMap: Map<string, any> = new Map<string, any>();

  constructor(private navCtrl: NavController,
              private storage: Storage,
              private authentication: Authentication,
              private translateService: TranslateService,
              private alertCtrl: AlertController,
              private appTranslationService: AppTranslationService,
              // private itemService: ItemService,
              private notificationService: NotificationService,
              private items: Items) {
  }

  ionViewWillEnter() {
    this.appTranslationService.initTranslate();
    this.initTranslateMessage();
    this.getNotifications();
    this.timer = setInterval(() => {
      if (PublicVar.getHasNewNotification()) {
        this.getNotifications();
        PublicVar.setHasNewNotification(false)
      }
    }, 5000)
  }

  ionViewDidEnter() {
  }

  initTranslateMessage() {
    let curLan = this.translateService.getBrowserLang();
    console.log('NotificationPage curLan: ' + curLan);
    // this.translateService.get(this.langKeys)
    //   .subscribe(res => {
    //
    //   });
  }

  doRefresh(refresher) {
    // this.currentItems = this.items.query();
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      this.getNotifications();
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    setTimeout(() => {
      this.getNotifications();
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  add() {
    PublicVar.setNotificationNum(PublicVar.getNotificationNum() + 1);
  }

  openItem(item: Notification) {
    this.navCtrl.push('notification-detail', {
      item: item
    });
    item.readed = true;
    this.notificationService.update(item).subscribe((res) => {
      this.getNotifications();
    });
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.notificationService.delete(item).subscribe((res) => {
      this.getNotifications();
    });
  }

  private getNotifications() {
    this.currentItems = [];
    let username = '';
    this.notificationService.query().subscribe((res) => {
      let notifications: any = [];
      notifications = res;
      if(notifications.length>0){
        this.currentItems = Utils.order(notifications,'createTime','desc');
      }
      // PublicVar.setNotificationNum(this.currentItems.length);
    }, (err) => {
      console.log('notification query error');
    });
    this.storage.get('username').then((val) => {
      username = val;
      this.notificationService.queryUnReadNotificationNum({readed: false, loginUserId: username}).subscribe((res) => {
        let unReadNotifications: any =  [];
        unReadNotifications = res;
        let unReadNotificationNum = unReadNotifications.length;
        PublicVar.setNotificationNum(unReadNotificationNum);
      }, (err) => {
        console.log('notification query error');
      });
    });
  }

}
