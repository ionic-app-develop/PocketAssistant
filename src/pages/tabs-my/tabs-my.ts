import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import {NavController, App, NavParams, Platform, AlertController, IonicPage} from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import {AppTranslationService} from '../../app/app.translation.service';
import {SettingPage} from '../setting/setting';

@IonicPage({name:'my'})
@Component({
  selector: 'page-tabs-my',
  templateUrl: 'tabs-my.html'
})
export class TabsMy {
  confirmExitTip: string;
  confirmTip: string;
  cancleTip: string;

  username: any = '';
  profilePic: any = 'assets/img/logo.png';
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    public translateService: TranslateService,
    public storage: Storage,
    public app: App,
    private alertCtrl: AlertController,
    private appTranslationService: AppTranslationService) {
  }

  ionViewWillEnter() {
    this.appTranslationService.initTranslate();
    this.initTranslateMessage();
  }

  initTranslateMessage() {
    this.translateService.get(["mine.confirmExit", "common.ok", "common.cancel"]).subscribe(res => {
        this.confirmExitTip = res["mine.confirmExit"];
        this.cancleTip = res["common.cancel"];
        this.confirmTip = res["common.ok"];
      });
    this.storage.get('username').then(value => {
      this.username = value;
    });
  }

  setting() {
    this.navCtrl.push(SettingPage);
  }

  loginOut() {
    Promise.all([
      this.storage.remove('userId'),
      this.storage.remove('usertoken'),
    ]).then(values => {
      console.log(values);
      this.app.getRootNav().setRoot('login');
    });
  }

  exitSoftware() {
    this.alertCtrl.create({
      title: this.confirmExitTip,
      buttons: [{ text: this.cancleTip },
      {
        text: this.confirmTip,
        handler: () => {
          this.platform.exitApp();
        }
      }
      ]
    }).present();
  }

  about() {
    this.navCtrl.push('generate-qr-code');
  }
}
