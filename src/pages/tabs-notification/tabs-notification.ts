import {TranslateService} from '@ngx-translate/core';
import {Storage} from '@ionic/storage';
import {ChangeDetectorRef, Component} from '@angular/core';
import {NavController, IonicPage} from 'ionic-angular';
import {AppTranslationService} from "../../app/app.translation.service";
import {Notification} from '../../models/index';
import {Authentication, NotificationService} from '../../providers/providers';
import {Utils} from "../../common/utils";
import {PublicVar} from "../../common/constant";
import {ThemeableBrowser, ThemeableBrowserOptions} from "@ionic-native/themeable-browser";

@IonicPage({name: 'notification'})
@Component({
  selector: 'page-tabs-notification',
  templateUrl: 'tabs-notification.html'
})
export class TabsNotification {
  private timer;
  currentItems: any = [];
  notifications: any = [];

  langKeys = [];
  langMap: Map<string, any> = new Map<string, any>();

  options: ThemeableBrowserOptions = {
    toolbar: {
      height: 44,
      color: '#387EF5'
    },
    title: {
      color: '#000000',
      showPageTitle: true
    },
    closeButton: {
      image: 'back',
      imagePressed: 'back_pressed',
      align: 'left',
      event: 'backPressed'
    }
  };

  constructor(private navCtrl: NavController,
              private storage: Storage,
              private authentication: Authentication,
              private translateService: TranslateService,
              // private alertCtrl: AlertController,
              private appTranslationService: AppTranslationService,
              // private itemService: ItemService,
              private notificationService: NotificationService,
              private cd: ChangeDetectorRef,
              // private items: Items,
              private themeableBrowser: ThemeableBrowser) {
  }

  ionViewWillEnter() {
    this.appTranslationService.initTranslate();
    this.initTranslateMessage();
  }

  ionViewDidEnter() {
    this.cd.detectChanges();
    this.getNotifications();
    this.timer = setInterval(() => {
      if (PublicVar.getHasNewNotification()) {
        this.getNotifications();
      }
    }, 3000)
  }

  initTranslateMessage() {
    let curLan = this.translateService.getBrowserLang();
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

  openItem(item: Notification) {
    this.navCtrl.push('notification-detail', {
      item: item
    });
    // let browser: ThemeableBrowserObject = this.themeableBrowser.create('https://www.baidu.com', '_self', this.options);
    // this.themeableBrowser.create('https://www.baidu.com', '_self', this.options);
  }

  addItem(item: Notification) {
    this.notificationService.add(item).subscribe((res) => {
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
    this.storage.get('username').then((val) => {
      username = val;
      this.notificationService.query({loginUserId: username}).subscribe((res) => {
        let notifications: any = [];
        notifications = res;
        if(notifications && notifications.length>0){
          this.currentItems = Utils.order(notifications,'createTime','desc');
        }
        PublicVar.setHasNewNotification(false);
      }, (err) => {
        console.log('notification query error');
      });
      this.notificationService.queryUnReadNotificationNum({readed: false, loginUserId: username}).subscribe((res) => {
        let unReadNotifications: any =  [];
        let unReadNotificationNum = '';
        unReadNotifications = res;
        if(res) {
          unReadNotificationNum = unReadNotifications.length;
        }
        PublicVar.setNotificationNum(unReadNotificationNum);
      }, (err) => {
        console.log('notification query error');
      });
    });
  }

}
