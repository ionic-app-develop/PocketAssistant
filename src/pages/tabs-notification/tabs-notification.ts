import {TranslateService} from '@ngx-translate/core';
import {Authentication} from './../../providers/authentication';
import {Storage} from '@ionic/storage';
import {Component} from '@angular/core';
import {NavController, AlertController, IonicPage} from 'ionic-angular';
import {AppTranslationService} from "../../app/app.translation.service";

@IonicPage({name: 'notification'})
@Component({
  selector: 'page-tabs-notification',
  templateUrl: 'tabs-notification.html'
})
export class TabsNotification {
  notifications = [];

  langKeys = [];
  langMap: Map<string, any> = new Map<string, any>();

  constructor(private navCtrl: NavController,
              private storage: Storage,
              private authentication: Authentication,
              private translateService: TranslateService,
              private alertCtrl: AlertController,
              private appTranslationService: AppTranslationService) {
  }

  ionViewWillEnter() {
    this.getNotifications();
    this.appTranslationService.initTranslate();
    this.initTranslateMessage();
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
    console.log('Begin async operation', refresher);
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);

    this.getNotifications();
  }

  openItem() {
  }

  private getNotifications() {
    this.notifications = [];
  }

}
