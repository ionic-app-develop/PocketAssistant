import {TranslateService} from '@ngx-translate/core';
import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AppTranslationService} from '../../app/app.translation.service';

// @IonicPage({name: 'setting'})
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  cancelTip: string;
  okTip: string;
  languages = [];
  selectLanguage: string;

  constructor(public navCtrl: NavController,
              private translateService: TranslateService,
              private appTranslationService: AppTranslationService) {
  }

  ionViewWillLeave() {
    if (!this.selectLanguage)
      return;
    this.translateService.use(this.selectLanguage);
    this.appTranslationService.useLan(this.selectLanguage);
  }

  ionViewWillEnter() {
    this.appTranslationService.initTranslate();
    this.initTranslateMessage();
    this.initUI();
  }

  initUI() {
    this.selectLanguage = localStorage.getItem('defaultLang');
  }

  initTranslateMessage() {
    this.cleanLanguages();
    this.translateService.get(["language.chinese", "language.english",
      "common.ok", "common.cancel"]).subscribe(res => {
      this.okTip = res["common.ok"];
      this.cancelTip = res["common.cancel"];
      this.languages.push({name: res["language.chinese"], id: 'zh'});
      this.languages.push({name: res["language.english"], id: 'en'});
    });
  }

  cleanLanguages() {
    for (let i = this.languages.length; i--; i > 0) {
      this.languages.pop();
    }
  }

  onSelectChange(selectedValue: any) {
    console.log('Selected ', selectedValue);
    if (!selectedValue)
      return;
    this.selectLanguage = selectedValue;
    localStorage.setItem('defaultLang', selectedValue);
    this.appTranslationService.useLan(selectedValue);
  }
}
