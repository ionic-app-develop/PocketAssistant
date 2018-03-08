import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import {NavController, App, NavParams, Platform, AlertController, IonicPage} from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import {AppTranslationService} from '../../app/app.translation.service';
import {SettingPage} from '../setting/setting';
import {SettingProvider, ToastService} from '../../providers/providers';
declare var window;

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

  selectedTheme: String;
  chcp = window.chcp;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private platform: Platform,
    private settings: SettingProvider,
    public translateService: TranslateService,
    public storage: Storage,
    public app: App,
    private alertCtrl: AlertController,
    private toastService: ToastService,
    private appTranslationService: AppTranslationService) {
    // 获取当前主题
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
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

  changeTheme() {
    if (this.selectedTheme === 'dark-theme') {
      //改变
      this.settings.setActiveTheme('light-theme');
    } else {
      this.settings.setActiveTheme('dark-theme');
    }
  }

  hotPush() {
    this.onUpdateLoad();
  }

  onUpdateLoad() {
    if (this.chcp.error.APPLICATION_BUILD_VERSION_TOO_LOW) {
      console.log('Native side update required');
      var dialogMessage = '发现新版本，即刻下载安装.';
      this.chcp.requestApplicationUpdate(dialogMessage, this.chcp.fetchUpdate(this.fetchUpdateCallback), this.userDeclinedRedirectCallback);
    }
  }

  userDeclinedRedirectCallback() {
    // User didn't want to leave the app.
    // Maybe he will update later.
  }

  checkForUpdate() {
    if (this.chcp === 'undefined') {
      // console.log('Native side update required');
      this.toastService.create('已是最新版本');
      return;
    }
    this.chcp.fetchUpdate(this.fetchUpdateCallback);
  }

  fetchUpdateCallback(error, data) {
    if (error) {
      console.log('Failed to load the update with error code: ' + error.code);
      console.log(error.description);
      return;
    }
    console.log('Update is loaded, running the installation');
    this.toastService.create('准备安装更新');
    this.chcp.installUpdate(this.installationCallback);
  }

  installationCallback(error) {
    if (error) {
      console.log('Failed to install the update with error code: ' + error.code);
      console.log(error.description);
    } else {
      console.log('Update installed!');
      this.toastService.create('安装更新成功');
    }
  }
}
