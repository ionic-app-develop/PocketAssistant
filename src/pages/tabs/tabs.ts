import {Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import {TranslateService} from '@ngx-translate/core';
import {AppTranslationService} from "../../app/app.translation.service";
import { Storage } from '@ionic/storage';

// @IonicPage({name: 'tabs'})
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  public notificationRoot: any = 'notification';
  public workRoot: any = 'work';
  public myRoot: any = 'my';
  public num;

  private timer;

  constructor(public navCtrl: NavController,
              public translate: TranslateService,
              public appTranslationService: AppTranslationService,
              public storage: Storage) {
    this.num = 5;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad');
  }

  ionViewWillEnter() {
    this.appTranslationService.initTranslate();
    console.log('ionViewWillEnter');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }

  ionViewWillLeave() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    console.log('ionViewWillLeave');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave');
  }

  ionViewWillUnload() {
    console.log('ionViewWillUnload');
  }

  ionViewCanEnter(){
    console.log("ionViewCanEnter");
  }

  ionViewCanLeave(){
    console.log("ionViewCanLeave");
  }
}
