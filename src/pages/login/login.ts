import {PublicVar} from '../../common/constant';
import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {IonicPage, NavController, Platform} from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';
import {Storage} from '@ionic/storage';
import {Account, JPushAppUserMaps} from '../../models/index';
import {AppTranslationService} from "../../app/app.translation.service";
import {TabsPage} from '../../pages/tabs/tabs';
import {JPushService} from 'ionic2-jpush'
import {Authentication, ToastService, MyJPushService} from '../../providers/providers'

@IonicPage({name: 'login'})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loginErrorTip: string;
  passwordErrorTip: string;
  login: Account = {username: '', password: ''};
  serverIP: string;
  submitted: boolean = false;
  rememberMe: boolean = false;
  backgroundImage = '';
  jpushAppUserMaps = new JPushAppUserMaps();

  @ViewChild('input') passwordInput;

  constructor(public navCtrl: NavController,
              private authentication: Authentication,
              private translateService: TranslateService,
              private appTranslationService: AppTranslationService,
              private toastService: ToastService,
              private storage: Storage,
              private jPushPlugin: JPushService,
              private myJPushService: MyJPushService,
              private platform: Platform,) {
    storage.get('rememberMe').then((val) => {
      this.rememberMe = val;
      if (this.rememberMe) {
        storage.get('username').then((val) => {
          this.login.username = val;
        });
        setTimeout(() => {
          this.passwordInput.setFocus();
        }, 150);
      }
    });

    platform.ready().then(() => {

      this.jPushPlugin.openNotification()
        .subscribe(res => {
          console.log('收到推送' + res);
          this.navCtrl.push('notification-detail', {
            item: {title: res.title, content: res.alert}
          });
        });

      this.jPushPlugin.receiveNotification()
        .subscribe(res => {
          PublicVar.setHasNewNotification(true);
          console.log('收到推送' + res);
        });

      this.jPushPlugin.receiveMessage()
        .subscribe(res => {
          console.log('收到推送' + res);
        });

      // 平台判断
      if (this.platform.is("android") || this.platform.is("ios")) {
        this.init();
      }
    })
  }

  /**
   * 注册极光
   */
  init() {
    this.jPushPlugin.init()
      .then(res => console.log('注册极光' + res))
      .catch(err => alert(err))
  }

  /**
   * 获取ID
   */
  getRegistrationID() {
    this.jPushPlugin.getRegistrationID()
      .then(res =>
        this.jpushAppUserMaps.jpushAppId = res.toString()
      )
      .catch(err => alert(err))
  }

  ionViewWillEnter() {
    this.appTranslationService.initTranslate();
    this.initTranslateMessage();
    // 平台
    if (this.platform.is("android") || this.platform.is("ios")) {
      this.getRegistrationID();
    }
  }

  initTranslateMessage() {
    let curLan = this.translateService.getBrowserLang();
    console.log('NotificationPage curLan: ' + curLan);
    this.translateService.get(["login.loginError", "login.passwordError"]).subscribe(res => {
      this.loginErrorTip = res["login.loginError"];
      this.passwordErrorTip = res["login.passwordError"];
    });
  }

  goToServerIPSetting() {
    this.navCtrl.push('serverip-setting');
  }

  onLogin(form: NgForm) {
    this.submitted = true;
    if (!form.valid)
      return;
    let message;
    this.storage.set('rememberMe', this.rememberMe);
    this.authentication.login(this.login.username, this.login.password).then((res) => {
      if (res && res[0].LogonId && res[0].token) {
        this.saveLocal(res);
        this.jpushAppUserMaps.loginUserId = res[0].LogonId;
        this.myJPushService.add(this.jpushAppUserMaps).subscribe((res) => {
          console.log('jpushAppUserMaps: ' + JSON.stringify(res))
        });;
        this.navCtrl.push(TabsPage);
      } else if (res && res[0].error) {
        this.toastService.create(this.passwordErrorTip);
      } else {
        this.toastService.create(this.passwordErrorTip);
      }
    }, (err) => {
      message = this.loginErrorTip;
      this.toastService.create(message);
    });
  }

  private saveLocal(res) {
    PublicVar.setUserId(res[0].userId);
    PublicVar.setUserToken(res[0].token);
    PublicVar.setUserName(this.login.username);
    this.storage.set('usertoken', res[0].token);
    this.storage.set('username', this.login.username);
    this.storage.set('userId', res[0].userId);
  }
}
