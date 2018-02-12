import { ToastService } from './../../providers/util/toast.service';
import { PublicVar } from '../../common/constant';
import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {AppTranslationService} from '../../app/app.translation.service';

@IonicPage({name: 'serverip-setting'})
@Component({
  selector: 'page-serverip-setting',
  templateUrl: 'serverip-setting.html',
})
export class ServeripSettingPage {
  backgroundImage = '';
  serverIP: string;

  constructor(public navCtrl: NavController,
              private toastService: ToastService,
              private storage: Storage,
              private appTranslationService: AppTranslationService
  ) {
    storage.get('serverIP').then((val) => {
      this.serverIP = val;
    });
  }

  ionViewWillEnter() {
    this.appTranslationService.initTranslate();
  }

  ionViewWillLeave() {
    if (!this.validateIPAddress())
      return;
    console.log('this.serverIP: ' + this.serverIP);
    PublicVar.setBaseURL(this.serverIP);
    console.log('this.getBaseURL: ' + PublicVar.GetBaseURL());
    this.storage.set('serverIP', this.serverIP);
  }

  private validateIPAddress(): boolean {
    if (!this.serverIP || this.serverIP === "") {
      this.toastService.create("server ip is null");
      return false;
    }
    if (!this.checkIP(this.serverIP))
      return false;
    return true;
  }

  private checkIP(serverip: string): boolean {
    let ip, port;

    let ipPort = serverip.split(':');
    if (ipPort.length !== 2) {
      this.toastService.create("invalid setting");
      return false;
    }
    ip = ipPort[0].trim();
    port = ipPort[1].trim();

    if (!this.isValidIP(ip)) {
      this.toastService.create("ip is invalid");
      return false;
    }
    if (!this.isValidPort(port)) {
      this.toastService.create("port is invalid");
      return false;
    }

    return true;
  }

  private isValidPort(port) {
    if (isNaN(port) || Number.parseInt(port) <= 0 || Number.parseInt(port) >= 65535) {
      return false;
    }
    return true;
  }

  private isValidIP(ipaddress) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
      return true;
    }
    return false;
  }
}
