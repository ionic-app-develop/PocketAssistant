import {PublicVar} from './../../providers/constant';
import {ToastService} from './../../providers/util/toast.service';
import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {IonicPage, NavController, Platform} from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';
import {Storage} from '@ionic/storage';
import {Account} from '../../models/account';
import {Authentication} from './../../providers/authentication';
import {AppTranslationService} from "../../app/app.translation.service";
import { TabsPage } from '../../pages/tabs/tabs';
import {JPushService} from 'ionic2-jpush'
import { MyJPushService } from '../../providers/jpush/jpush.service'

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

  @ViewChild('input') passwordInput;

  _log: string;

  get log(): string {
    return this._log || '';
  }

  set log(m: string) {
    if (!this._log) {
      this._log = '';
    }
    this._log += `${new Date().toLocaleString()}: ${m} \n`
  }

  asyncStack:string[] = [];

  _addStack(name: string) {
    this.asyncStack = Array.from(new Set([...this.asyncStack, name]))
  }

  _rmStack(name: string) {
    const index = this.asyncStack.indexOf(name);
    if (index === -1) return;
    this.asyncStack.splice(index, 1);
  }

  _hasInStack(name: string): boolean {
    return  this.asyncStack.indexOf(name) !== -1
  }

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
          this.navCtrl.push(TabsPage);
        });

      this.jPushPlugin.receiveNotification()
        .subscribe(res => {
          console.log('收到推送' + res);
        });

      this.jPushPlugin.receiveMessage()
        .subscribe(res => {
          console.log('收到推送' + res);
        });

      // 平台判断
      if(this.platform.is("android") || this.platform.is("ios")){
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
      .then(res => console.log('注册极光' + res))
      .catch(err => alert(err))
  }

  /**
   * 设置标签
   */
  // setTags() {
  //   this.jPushPlugin.setTags({
  //     sequence: Date.now(),
  //     tags: ['tag1', 'tag2']
  //   })
  //     .then((res: any) => {
  //       console.log(res.tags.toString())
  //     })
  //     .catch(err => {
  //       alert(err);
  //       console.log(err)
  //     })
  // }

  /**
   * 停止推送
   */
  stopPush() {
    this.jPushPlugin.stopPush()
      .then(res => {
        alert(res);
        this.log = `停止推送服务成功`
      })
      .catch(err => {
        alert(err);
        this.log = '停止推送服务失败'
      })
  }

  /**
   * 恢复推送
   */
  resumePush() {
    this.jPushPlugin.resumePush()
      .then(res => {
        alert(res);
        this.log = `恢复推送服务成功`
      })
      .catch(err => {
        alert(err);
        this.log = '恢复推送务失败'
      })
  }

  /**
   * 设置别名
   */
  setAlias() {
    this._addStack('setAlias');
    this.jPushPlugin.setAlias({
      sequence: Date.now(),
      alias: 'test_alia'
    })
      .then((res:any) => {
        this.log = `设置别名成功 别名：${res.alias}`;
        this._rmStack('setAlias');
      })
      .catch(err => {
        alert(err);
        this.log = '设置别名失败';
        this._rmStack('setAlias');
      })
  }

  /**
   * 删除别名
   */
  deleteAlias() {
    this._addStack('deleteAlias');
    this.jPushPlugin.deleteAlias({
      sequence: Date.now(),
    })
      .then((res:any) => {
        this.log = `删除别名成功`;
        this._rmStack('deleteAlias');
      })
      .catch(err => {
        alert(err);
        this.log = '删除别名失败';
        this._rmStack('deleteAlias');
      })
  }

  /**
   * 获取别名
   */
  getAlias() {
    this._addStack('getAlias');
    this.jPushPlugin.getAlias({
      sequence: Date.now(),
    })
      .then((res:any) => {
        this.log = `获取别名成功: 别名：${res.alias}`;
        this._rmStack('getAlias');
      })
      .catch(err => {
        alert(err);
        this.log = '获取别名失败';
        this._rmStack('getAlias');
      })
  }

  /**
   * 设置标签
   */
  setTags() {
    this._addStack('setTags');
    this.jPushPlugin.setTags({
      sequence: Date.now(),
      tags: ['tag1', 'tag2']
    })
      .then((res:any) => {
        this.log = `设置 Tags 成功：${res.tags.toString()}`;
        this._rmStack('setTags');
      })
      .catch(err => {
        alert(err);
        this.log = '设置 Tags 失败';
        this._rmStack('setTags');
      })
  }

  /**
   * 添加标签
   */
  addTags() {
    this._addStack('addTags');
    this.jPushPlugin.addTags({
      sequence: Date.now(),
      tags: ['tag4', 'tag5']
    })
      .then((res:any) => {
        this.log = `添加 Tags 成功：${res.tags.toString()}`;
        this._rmStack('addTags');
      })
      .catch(err => {
        alert(err);
        this.log = '添加 Tags 失败';
        this._rmStack('addTags');
      })
  }

  /**
   * 清除所有标签
   */
  cleanTags() {
    this._addStack('cleanTags');
    this.jPushPlugin.cleanTags({
      sequence: Date.now(),
    })
      .then((res:any) => {
        this.log = `清除所有 Tags 成功`;
        this._rmStack('cleanTags');
      })
      .catch(err => {
        alert(err);
        this.log = '清除所有 Tags 失败';
        this._rmStack('cleanTags');
      })
  }

  /**
   * 获取当前绑定的所有标签
   */
  getAllTags() {
    this._addStack('getAllTags');
    this.jPushPlugin.getAllTags({
      sequence: Date.now(),
    })
      .then((res:any) => {
        this.log = `获取当前绑定的所有 Tags 成功：${res.tags.toString()}`;
        this._rmStack('getAllTags');
      })
      .catch(err => {
        alert(err);
        this.log = '获取当前绑定的所有 Tags 失败';
        this._rmStack('getAllTags');
      })
  }

  ionViewWillEnter() {
    this.appTranslationService.initTranslate();
    this.initTranslateMessage();
    // 平台
    if(this.platform.is("android") || this.platform.is("ios")){
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
