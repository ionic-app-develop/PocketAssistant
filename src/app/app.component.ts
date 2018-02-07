import {ToastService} from './../providers/util/toast.service';
import {Component, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core'
import {Platform, Nav, Config, IonicApp} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Storage} from '@ionic/storage';
import {AppTranslationService} from './app.translation.service';

@Component({
  template: `
    <ion-nav #content [root]="rootPage"></ion-nav>`
})
export class MyApp {

  rootPage = 'login';
  backButtonPressed: boolean = false;  //用于判断返回键是否触发
  onceAgainExit: string;

  @ViewChild(Nav) nav: Nav;

  constructor(public ionicApp: IonicApp,
              public translate: TranslateService,
              public appTranslationService: AppTranslationService,
              public platform: Platform,
              public config: Config,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public toastService: ToastService,
              public storage: Storage
              ) {
  }

  ionViewWillEnter() {
    console.log('app ionViewWillEnter');
    this.appTranslationService.initTranslate();
    this.initTranslate();
  }

  ionViewDidLoad() {
    console.log('app ionViewDidLoad');
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.registerBackButtonAction();//注册返回按键事件
    });
  }

  initTranslate() {
    this.translate.get(['common.back'], ['onceAgainExit']).subscribe(res => {
      this.config.set('ios', 'backButtonText', res['common.back']);
      this.onceAgainExit = res['onceAgainExit'];
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  registerBackButtonAction() {
    this.platform.registerBackButtonAction(() => {
      //如果想点击返回按钮隐藏toast或loading或Overlay就把下面加上
      // this.ionicApp._toastPortal.getActive() || this.ionicApp._loadingPortal.getActive() || this.ionicApp._overlayPortal.getActive()
      let activePortal = this.ionicApp._modalPortal.getActive();
      if (activePortal) {
        activePortal.dismiss().catch(() => {
        });
        activePortal.onDidDismiss(() => {
        });
        return;
      }
      let activeVC = this.nav.getActive();
      let tabs = activeVC.instance.tabs;
      let activeNav = tabs.getSelected();
      return activeNav.canGoBack() ? activeNav.pop() : this.showExit()
    }, 1);
  }

  //双击退出提示框
  showExit() {
    if (this.backButtonPressed) { //当触发标志为true时，即2秒内双击返回按键则退出APP
      this.platform.exitApp();
    } else {
      this.toastService.create(this.onceAgainExit);
      this.backButtonPressed = true;
      setTimeout(() => this.backButtonPressed = false, 2000);//2秒内没有再次点击返回则将触发标志标记为false
    }
  }

  ionViewDidEnter() {
    console.log('app ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('app ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('app ionViewDidLeave');
  }

  ionViewWillUnload() {
    console.log('app ionViewWillUnload');
  }

  ionViewCanEnter() {
    console.log("app ionViewCanEnter");
  }

  ionViewCanLeave() {
    console.log("app ionViewCanLeave");
  }
}
