import {Storage} from '@ionic/storage';
import {TranslateService} from '@ngx-translate/core';
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AppTranslationService} from "../../app/app.translation.service";

@IonicPage({name: 'generate-qr-code'})
@Component({
  selector: 'page-generate-qr-code',
  templateUrl: 'generate-qr-code.html',
})

export class GenerateQrCodePage {
  apkDownloadURL: string;

  constructor(
              private navParams: NavParams,
              private appTranslationService: AppTranslationService,
              private storage: Storage) {
    this.getServerIP();
  }

  ionViewWillEnter() {
    this.appTranslationService.initTranslate();
  }

  getServerIP(): any {
    this.storage.get('serverIP').then((val) => {
      if (!val)
        return;
      this.apkDownloadURL = `http://${val}/api/files/apk/MobileAssistant.apk`;
    });
  }

}
