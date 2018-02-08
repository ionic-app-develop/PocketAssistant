import {TranslateService} from '@ngx-translate/core';
import {Authentication} from './../../providers/authentication';
import {Storage} from '@ionic/storage';
import {Component} from '@angular/core';
import {NavController, AlertController, IonicPage} from 'ionic-angular';
import {AppTranslationService} from "../../app/app.translation.service";
import { Item } from '../../models/item';
import { Items } from '../../providers/providers';
import {ItemService} from "../../providers/mockService/item_service";
import { PublicVar} from "../../providers/constant";

@IonicPage({name: 'notification'})
@Component({
  selector: 'page-tabs-notification',
  templateUrl: 'tabs-notification.html'
})
export class TabsNotification {
  // currentItems: Item[];
  currentItems: any = [];
  notifications = [];

  langKeys = [];
  langMap: Map<string, any> = new Map<string, any>();

  constructor(private navCtrl: NavController,
              private storage: Storage,
              private authentication: Authentication,
              private translateService: TranslateService,
              private alertCtrl: AlertController,
              private appTranslationService: AppTranslationService,
              private itemService: ItemService,
              private items: Items,) {
  }

  ionViewWillEnter() {
    this.currentItems = [];
    this.getNotifications();
    this.appTranslationService.initTranslate();
    this.initTranslateMessage();
    // this.currentItems = this.items.query();
    // console.log(this.currentItems);
    this.itemService.getItems().subscribe(
      (res) => {
        PublicVar.setNotificationNum(res.length);
        // localStorage.setItem('unreadNum', res.length.toString())
        console.log('res.length: ' + PublicVar.getNotificationNum());
        for (let item of res) {
          this.currentItems.push(new Item(item));
        }
      });
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
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);

    this.getNotifications();
  }

  openItem() {
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  private getNotifications() {
    this.notifications = [];
  }

}
